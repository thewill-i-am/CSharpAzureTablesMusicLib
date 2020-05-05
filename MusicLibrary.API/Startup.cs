using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MusicLibrary.Services.Music;
using MusicLibrary.Services.Users;
using MusicLibrary.Core.Music.Interfaces;
using MusicLibrary.Core.Users.Interfaces;
using ElmahCore.Mvc;

namespace MusicLibrary.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddElmah();
            services.AddControllers();
            var azureConection = Configuration["AzureConnString"];
            services.AddScoped<IUsersService, UsersServices>(ServiceProvider=> 
            {
                return new UsersServices(azureConection);
            });
            services.AddScoped<IMusicServices, MusicServices>(ServiceProvider =>
            {
                return new MusicServices(azureConection);
            });
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseElmah();

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
