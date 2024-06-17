data "azurerm_resource_group" "cookbooks-rg" {
  name = "cookbooks-rg"
}

data "azurerm_container_registry" "cookbookssacr" {
  name                = "cookbooksacr"
  resource_group_name = data.azurerm_resource_group.cookbooks-rg.name
}

resource "azurerm_user_assigned_identity" "ReadACR" {
  location            = data.azurerm_resource_group.cookbooks-rg.location
  name                = "ReadACR"
  resource_group_name = data.azurerm_resource_group.cookbooks-rg.name
}

resource "azurerm_role_assignment" "acireadacr" {
  principal_id                     = azurerm_user_assigned_identity.ReadACR.principal_id
  role_definition_name             = "AcrPull"
  scope                            = data.azurerm_container_registry.cookbookssacr.id
  skip_service_principal_aad_check = true
}

resource "azurerm_container_group" "cookbooks-backend" {
  name                = "cookbooks-backend"
  location            = data.azurerm_resource_group.cookbooks-rg.location
  resource_group_name = data.azurerm_resource_group.cookbooks-rg.name
  ip_address_type     = "Public"
  dns_name_label      = "cookbooks"
  os_type             = "Linux"
  depends_on = [
    azurerm_role_assignment.acireadacr,
    azurerm_storage_account.cookbooks-storage,
    azurerm_storage_share.sql-setup,
    azurerm_storage_share.mysql-data
  ]


  identity {
    type = "UserAssigned"
    identity_ids = [
      azurerm_user_assigned_identity.ReadACR.id
    ]
  }


  image_registry_credential {
    server                    = data.azurerm_container_registry.cookbookssacr.login_server
    user_assigned_identity_id = azurerm_user_assigned_identity.ReadACR.id
  }

  container {
    name   = "cookbooks-api"
    image  = "cookbooksacr.azurecr.io/cookbooks-api"
    cpu    = "1"
    memory = "1.5"

    ports {
      port     = 80
      protocol = "TCP"
    }

    environment_variables = {
      PORT    = 80
      DB_PORT = 3306
      DB_HOST = "127.0.0.1"
    }

    secure_environment_variables = {
      DB_PASSWORD           = var.db-pass
      DB_DATABASE           = var.db-name
      DB_USER               = var.db-username
      FIREBASE_CLIENT_EMAIL = var.firebase-client-email
      FIREBASE_PROJECT_ID   = var.firebase-project-id
      FIREBASE_PRIVATE_KEY  = var.firebase-private-key
    }
  }

  container {
    name   = "mysql"
    image  = "mysql:8.2"
    cpu    = "1"
    memory = "1.5"
    secure_environment_variables = {
      MYSQL_ROOT_PASSWORD = var.db-pass
      MYSQL_DATABASE      = var.db-name
      MYSQL_USER          = var.db-username
      MYSQL_PASSWORD      = var.db-pass
    }
    volume {
      name                 = azurerm_storage_share.sql-setup.name
      mount_path           = "/docker-entrypoint-initdb.d"
      share_name           = azurerm_storage_share.sql-setup.name
      storage_account_name = azurerm_storage_account.cookbooks-storage.name
      storage_account_key  = azurerm_storage_account.cookbooks-storage.primary_access_key
    }
    volume {
      name                 = azurerm_storage_share.mysql-data.name
      mount_path           = "/var/lib/sql"
      share_name           = azurerm_storage_share.mysql-data.name
      storage_account_name = azurerm_storage_account.cookbooks-storage.name
      storage_account_key  = azurerm_storage_account.cookbooks-storage.primary_access_key
    }
  }
}

resource "azurerm_storage_account" "cookbooks-storage" {
  name                     = "cookbooksstorage"
  resource_group_name      = data.azurerm_resource_group.cookbooks-rg.name
  location                 = data.azurerm_resource_group.cookbooks-rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  large_file_share_enabled = true
}

resource "azurerm_storage_share" "sql-setup" {
  name                 = "sql-setup"
  storage_account_name = azurerm_storage_account.cookbooks-storage.name
  quota                = 1
}

resource "azurerm_storage_share" "mysql-data" {
  name                 = "mysql-data"
  storage_account_name = azurerm_storage_account.cookbooks-storage.name
  quota                = 50
}
