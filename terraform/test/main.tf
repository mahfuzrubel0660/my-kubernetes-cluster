resource "local_file" "games" {
     filename     = "/root/terraform/test/text"
     content  = "FIFA 21"
}
resource "random_pet" "other-pet" {
     length = 1
     prefix = "Mr"
     separator = ". "

}

