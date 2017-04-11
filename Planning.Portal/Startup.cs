using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Planning.Portal.Startup))]
namespace Planning.Portal
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            
            ConfigureAuth(app);
        }
    }
}
