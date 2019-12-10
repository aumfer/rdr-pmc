module "website" {
  source         = "git::https://github.com/cloudposse/terraform-aws-s3-website.git?ref=0.8.0"
  namespace      = local.namespace
  stage          = local.stage
  name           = "${var.repo_name}-${var.branch_name}"
  hostname       = "${var.branch_name}.${var.repo_name}.alteredco.com"
  parent_zone_id = data.aws_route53_zone.primary.zone_id
}
