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
    dockerhub = {
      source  = "BarnabyShearer/dockerhub"
      version = ">= 0.0.15"
    }
  }
}

provider "azurerm" {
  features {}
}

provider "docker" {
  registry_auth {
    address  = "registry-1.docker.io"
    username = var.dockerhub-username
    password = var.dockerhub-password
  }
}

provider "dockerhub" {
  username = var.dockerhub-username
  password = var.dockerhub-password
}
