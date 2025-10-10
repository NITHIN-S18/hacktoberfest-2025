const post_textarea = document.getElementById("post_textarea");
let currentBackground = null;

function set_bg(event) {
  const imgElement = event.currentTarget; // Always gives the element with the handler
  currentBackground = imgElement.id;
  post_textarea.style.backgroundImage = `url('./assets/${currentBackground}.jpeg')`;
};

function create_post() {
  const post_sec = document.getElementById("post_sec");
  let post_user_name = document.getElementById("username_input").value.trim();
  const post_content = post_textarea.value;
  let post_id = Date.now();

  let bgStyle = "";
  if (currentBackground) {
    bgStyle = `style="background-image:url('./assets/${currentBackground}.jpeg');"`;
  }

  if (!post_content) {
    alert("Please write something before posting!");
    return;
  }

  if (post_user_name === "") {
    post_user_name = "Anonymous";
  }

  post_sec.style.display = "flex";

  post_sec.innerHTML += `
  <div class="card post" id="post_${post_id}">
        <div class="card-body post_body">
          <h5 class="card-title post_title">
            <img
              src="./assets/dummy_user_pic.png"
              alt="user_pic"
              width="40"
              height="40"
            />
            ${post_user_name}
          </h5>
          <h6 class="card-subtitle mb-2 text-muted">
            ${new Date().toLocaleString()}
          </h6>
          </div>
          <p class=" card-text post_text" id="post_text${post_id}" ${bgStyle}>${post_content}</p>
          <div class="comment_par_section collapse" id="comments_${post_id}">
            <div class="card card-body com_card">
              <div class="comment-section">
                <input
                  type="text"
                  class="comment_name_input"
                  name="comment_name_input_${post_id}"
                  id="comment_name_input_${post_id}"
                  placeholder="Enter your Name"
                />
                <textarea
                  id="comment_textarea_${post_id}"
                  class="form-control form_control mb-2"
                  placeholder="Write a comment..."
                ></textarea>
                <button onclick="comment_sec(${post_id})" class="post_com_btn btn btn-sm">Post Comment</button>
              </div>
            </div>
          </div>
          <div class="post_btns">
            <button id="like_btn_${post_id}" onclick="change_like_icon(${post_id})">
              <i class="fa-regular fa-thumbs-up"></i>Like
            </button>
            <button
              id="comment_btn_${post_id}"
              data-bs-toggle="collapse"
              data-bs-target="#comments_${post_id}"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              <i class="fa-regular fa-comment"></i>
              Comment
            </button>
          </div>
      </div>
  `;

  post_textarea.value = "";
  post_textarea.style.backgroundImage = ''; // Clear the background after posting
  currentBackground = null;
}

function change_like_icon(post_id) {
  const like_btn = document.getElementById(`like_btn_${post_id}`);
  if (like_btn.innerHTML == `<i class="fa-regular fa-thumbs-up"></i>Like`) {
    like_btn.innerHTML = `<i class="fa-solid fa-thumbs-up"></i>Liked`;
  } else {
    like_btn.innerHTML = `<i class="fa-regular fa-thumbs-up"></i>Like`;
  }
}

function comment_sec(post_id) {
  const post_i = document.getElementById(`post_${post_id}`);
  let comment_user_name = document.getElementById(`comment_name_input_${post_id}`).value.trim();
  const comment_content = document.getElementById(`comment_textarea_${post_id}`).value.trim();

  if (!comment_content) {
    alert("Please write something before posting!");
    return;
  }

  if (comment_user_name === null) {
    comment_user_name = "Anonymous";
  } 
  post_i.innerHTML +=`
  <div id="comments_${post_id}" class="comments">
    <div class="card-body comment_body">
          <h4 style="color:var(--secondary);">Comment</h4>
          <h5 class="card-title post_title">
            <img
              src="./assets/dummy_user_pic.png"
              alt="user_pic"
              width="40"
              height="40"
            />
            ${comment_user_name}
          </h5>
          <h6 class="card-subtitle mb-2 text-muted">
            ${new Date().toLocaleString()}
          </h6>
          </div>
          <p class="card-text post_text" id="comment_text">${comment_content}</p>
  </div>
  `;
}
