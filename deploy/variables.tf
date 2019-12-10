variable "repo_name" {}

variable "branch_name" {}

variable "aws_region" {
  default = "us-east-1"
}

locals {
  namespace = "rdr"

  stage = "np" //"p"
}
