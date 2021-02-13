using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TechTestApp.Models;

namespace TechTestApp
{
    public class MovieDbContext : DbContext
    {
        public MovieDbContext(DbContextOptions<MovieDbContext> options) : base(options)
        { 
        }

        public DbSet<MotionPictures> MotionPictures { get; set; }
    }
}
