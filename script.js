document.addEventListener('DOMContentLoaded', function() {
    fetch('posts/posts.json')
        .then(response => response.json())
        .then(posts => {
            const container = document.getElementById('posts-container');
            posts.forEach(post => {
                fetch(`posts/${post}`) // Fetch each post content
                    .then(response => response.text()) // Get the response text
                    .then(htmlContent => {
                        const postContainer = document.createElement('div'); // Create a div to hold the post
                        postContainer.className = 'post';
                        postContainer.innerHTML = htmlContent; // Insert the HTML content of the post
                        container.appendChild(postContainer); // Append the post to the container
                    })
                    .catch(err => console.error('Failed to load post content:', err));
            });
        })
        .catch(err => console.error('Failed to load posts:', err));
});
