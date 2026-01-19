from fastapi import FastAPI, HTTPException
from .Schemas import PostCreate

app = FastAPI()

text_posts = {
    1: {"title": "New Post", "Content": "A Cool New Post"},
    2: {"title": "Second Post", "Content": "Another Interesting Post"},
    3: {"title": "Tech Update", "Content": "Latest Trends in Technology"},
    4: {"title": "Daily Thoughts", "Content": "Sharing Some Daily Reflections"},
    5: {"title": "Project Log", "Content": "Progress Update on Current Project"},
    6: {"title": "Tutorial", "Content": "Step-by-Step Learning Guide"},
    7: {"title": "Announcement", "Content": "Important News and Updates"},
    8: {"title": "Opinion", "Content": "Personal Views on Recent Events"},
    9: {"title": "Tips & Tricks", "Content": "Useful Tips for Better Productivity"},
    10: {"title": "Wrap Up", "Content": "Summary and Final Thoughts"}
}


@app.get("/posts")
def getAllPosts(Limit: int = None):
    if Limit:
        return list(text_posts.values())[:Limit]
    else:
        return text_posts


@app.get("/posts/{post_id}")
def getPost(post_id: int):
    if post_id not in text_posts:
        raise HTTPException(status_code=404, detail="Post not found")
    else:
        return text_posts.get(post_id)


@app.post("/posts")
def create_post(post: PostCreate):
    new_post = {"title": post.title, "content": post.content}
    text_posts[max(text_posts.keys()) + 1] = new_post
    return new_post