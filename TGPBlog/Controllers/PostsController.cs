using Microsoft.AspNet.Identity;
using PagedList;
using PagedList.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using TGPBlog.Models;

namespace TGPBlog.Controllers
{
    [RequireHttps]
    public class PostsController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: Posts
        public ActionResult Admin(int? page)
        {
            //var es = new EmailService();
            //var msg = new IdentityMessage();
            //msg.Body = "This is the body of a test message created in PostsController.cs";
            //msg.Subject = "Testing email service from Blog";
            //msg.Destination = "tpeara@gmail.com";
            //es.SendAsync(msg);

            int pageNumber = (page ?? 1);
            int pageSize = 9;
            return View(db.Posts.OrderByDescending(p => p.Created).ToPagedList(pageNumber, pageSize));

            //return View(db.Posts.OrderByDescending(p=>p.Created).Take(12).ToList());
        }


        // GET: Posts
        public ActionResult Index(int? page)
        {

            int pageNumber = (page ?? 1);
            int pageSize = 9;
            return View(db.Posts.OrderByDescending(p => p.Created).ToPagedList(pageNumber, pageSize));

        }


        // GET: Posts/AdminDetails/5
        public ActionResult AdminDetails(string slug)
        {
            if (String.IsNullOrWhiteSpace(slug))
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Post post = db.Posts.FirstOrDefault(p => p.Slug == slug);
            if (post == null)
            {
                return HttpNotFound();
            }
            return View(post);
        }


        // GET: Posts/AdminDetails/5
        public ActionResult Details(string slug)
        {
            if (String.IsNullOrWhiteSpace(slug))
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Post post = db.Posts.FirstOrDefault(p => p.Slug == slug);
            if (post == null)
            {
                return HttpNotFound();
            }
            return View(post);
        }

        public ActionResult Post(string slug)
        {
            if (String.IsNullOrWhiteSpace(slug))
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Post post = db.Posts.FirstOrDefault(p => p.Slug == slug);
            if (post == null)
            {
                return HttpNotFound();
            }
            return View(post);
        }

        // GET: Posts/Create
        [Authorize(Roles = "Admin")]
        public ActionResult Create()
        {
            return View();
        }

        // POST: Posts/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more AdminDetails see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Admin")]
        //public ActionResult Create([Bind(Include = "id,Title,Body,MediaURL,Category")] Post post, HttpPostedFileBase image)
        public ActionResult Create([Bind(Include = "id,Title,Body,MediaURL,Category")] Post post)
        {
            if (ModelState.IsValid)
            {
                // restrict the valid file formats for images


                post.Created = System.DateTimeOffset.Now;
                //..... set slug here ....
                var Slug = StringUtilities.URLFriendly(post.Title);
                if (String.IsNullOrWhiteSpace(Slug))
                {
                    ModelState.AddModelError("Title", "A title is required");
                    return View(post);
                }
                if (db.Posts.Any(p => p.Slug == Slug))
                {
                    ModelState.AddModelError("Title", "The title must be  unique");
                    return View(post);
                }
                post.Slug = Slug;

                db.Posts.Add(post);
                db.SaveChanges();
                return RedirectToAction("Admin");
            }

            return View(post);
        }


        // GET: Posts/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Post post = db.Posts.Find(id);
            if (post == null)
            {
                return HttpNotFound();
            }
            return View(post);
        }

        // POST: Posts/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more AdminDetails see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "id,Created,Updated,Title,Slug,Body,MediaURL,Category")] Post post)
        {
            if (ModelState.IsValid)
            {

                post.Updated = System.DateTimeOffset.Now;
                //..... set slug here ....
                //var Slug = StringUtilities.URLFriendly(post.Title);
                //if (String.IsNullOrWhiteSpace(Slug))
                //{
                //    ModelState.AddModelError("Title", "A title is required");
                //    return View(post);
                //}
                //if (db.Posts.Any(p => p.Slug == Slug))
                //{
                //    ModelState.AddModelError("Title", "The title must be  unique");
                //    return View(post);
                //}
                //post.Slug = Slug;

                //db.Posts.Attach(post);
                //db.Entry(post).Property(p => p.Body).IsModified = true;
                //db.Entry(post).Property("Title").IsModified = true;
                //db.Entry(post).Property(p=>p.Updated).IsModified = true;
                //db.Entry(post).Property(p=>p.MediaURL).IsModified = true;
                //db.SaveChanges();

                db.Entry(post).State = EntityState.Modified;  // modifies entire row
                db.SaveChanges();

                return RedirectToAction("Admin");
            }
            return View(post);
        }



        // GET: Posts/EditComment/5
        public ActionResult EditComment(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Comment comment = db.Comments.Find(id);
            if (comment == null)
            {
                return HttpNotFound();
            }
            return View(comment);
        }

        // POST: Posts/EditComment
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult EditComment([Bind(Include = "id,PostId,Body")] Comment comment)
        {
            if (ModelState.IsValid)
            {
                comment.Updated = System.DateTimeOffset.Now;

                db.Comments.Attach(comment);
                db.Entry(comment).Property("Body").IsModified = true;
                db.Entry(comment).Property(c => c.Updated).IsModified = true;

                db.SaveChanges();
                //db.Entry(comment).State = EntityState.Modified;  
                //db.SaveChanges();

                return RedirectToAction("Details");
            }
            return View(comment);
        }



        // GET: Posts/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Post post = db.Posts.Find(id);
            if (post == null)
            {
                return HttpNotFound();
            }
            return View(post);
        }

        // POST: Posts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Post post = db.Posts.Find(id);
            db.Posts.Remove(post);
            db.SaveChanges();
            return RedirectToAction("Admin");
        }


        // ************************************************************************* //

        // POST: Posts/CreateComment
        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        public ActionResult CreateComment([Bind(Include = "PostId,Body")] Comment comment, string alias)
        {
            Console.WriteLine("Inside CreateComment - PostId {0} Body {1} alias {2}", comment.PostId, comment.Body, alias);
            var slug = db.Posts.Find(comment.PostId).Slug;
            if (ModelState.IsValid)
            {
                comment.AuthorId = User.Identity.GetUserId();
                var user = db.Users.Find(comment.AuthorId);
                user.DisplayName = alias;
                comment.Created = System.DateTimeOffset.Now;

                db.Comments.Add(comment);
                db.SaveChanges();
                // return RedirectToAction("Details", new { Slug = slug } );
            }
            return RedirectToAction("Details", new { Slug = slug });
        }


        // GET: Posts/Delete/5
        public ActionResult DeleteComment(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Comment comment = db.Comments.Find(id);
            if (comment == null)
            {
                return HttpNotFound();
            }
            return View(comment);
        }

        // POST: Posts/Delete/5
        [HttpPost, ActionName("DeleteComment")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteCommentConfirmed(int id)
        {
            Comment comment = db.Comments.Find(id);
            db.Comments.Remove(comment);
            db.SaveChanges();
            return RedirectToAction("Admin");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
