using System.ComponentModel.DataAnnotations;


namespace TGPBlog.Models.CodeFirst
{
    public class ContactMsg
    {

        [Required]
        public string Name { get; set; }

        [Required]
        public string EmailAddress { get; set; }

        [Required]
        public string Subject { get; set; }

    }
}