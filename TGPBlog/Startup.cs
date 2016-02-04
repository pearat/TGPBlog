using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TGPBlog.Startup))]
namespace TGPBlog
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
