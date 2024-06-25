terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.109.0"
    }
    docker = {
      source  = "kreuzwerker/docker"
      version = "3.0.2"
    }
  }
}

provider "azurerm" {
  features {}
}

provider "docker" {
  registry_auth {
    address  = azurerm_container_registry.cookbooksacr.login_server
    username = azurerm_container_registry.cookbooksacr.admin_username
    password = azurerm_container_registry.cookbooksacr.admin_password
  }
}
