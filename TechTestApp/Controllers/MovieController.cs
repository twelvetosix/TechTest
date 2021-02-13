using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;
using TechTestApp.Models;

namespace TechTestApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        private readonly MovieDbContext _dbContext;

        public MoviesController(MovieDbContext dbContext)
        {
            _dbContext = dbContext;            
        }

        [HttpGet]
        public async Task<ActionResult<List<MotionPictures>>> GetAllMovies()
        {
            return await _dbContext.MotionPictures.ToListAsync();
        } 
        
        [HttpPost("Add")]
        public async Task<ActionResult<MotionPictures>> AddMovies(MotionPictures data)
        {
            MotionPictures toAdd = data;
            try
            {                
                _dbContext.MotionPictures.Add(toAdd);
                await _dbContext.SaveChangesAsync();
            }
            catch(Exception e)
            {                
                return BadRequest("Unable to add movie!" + e.Message);
            }
            return Ok(toAdd);
        }

        [HttpPut("Update")]
        public async Task<ActionResult<MotionPictures>> UpdateMovie(MotionPictures updatedMovie)
        {
            _dbContext.Entry(updatedMovie).State = EntityState.Modified;
            try
            {
                await _dbContext.SaveChangesAsync();             
            }
            catch(Exception e)
            {
                if(!_dbContext.MotionPictures.Any(x => x.ID == updatedMovie.ID))
                {
                    return NotFound("No movie with ID " + updatedMovie.ID + " was found!");
                }
                else
                {
                    return BadRequest("Error updating record");
                }
            }
            return Ok(updatedMovie);
        }

        [HttpDelete("Delete")]
        public async Task<ActionResult> DeleteMovie(int id)
        {
            try
            {
                MotionPictures toDelete = _dbContext.MotionPictures.SingleOrDefault(x => x.ID == id);      
                // TODO: Check null
                _dbContext.MotionPictures.Remove(toDelete);
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return BadRequest("Error deleting record");
            }
            return Ok();
        }
    }
}
