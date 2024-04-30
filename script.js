document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('posts-container');
    let loading = false;
    let page = 1; // Track the current page number
    const postsPerPage = 10; // Specify the number of posts to load per page
    let posts = []; // Array to store all post filenames
    
    function loadPosts() {
        if (loading) return;
        loading = true;
        
        fetch('posts/posts.json')
            .then(response => response.json())
            .then(allPosts => {
                posts = allPosts;
                displayPosts();
                loading = false;
            })
            .catch(err => {
                console.error('Failed to load posts:', err);
                loading = false;
            });
    }
    
    function displayPosts() {
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;
        const visiblePosts = posts.slice(start, end);
        
        visiblePosts.forEach(postFileName => {
            fetch(`posts/${postFileName}`)
                .then(response => response.text())
                .then(postContent => {
                    const postContainer = document.createElement('div');
                    postContainer.className = 'post';
                    postContainer.innerHTML = postContent;
                    container.appendChild(postContainer);
                })
                .catch(err => {
                    console.error('Failed to load post content:', err);
                });
        });
    }
    
    // Detect scroll event
    window.addEventListener('scroll', function() {
        // Check if user has scrolled to the bottom of the page
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
            page++;
            displayPosts();
        }
    });
    
    // Initial load
    loadPosts();
});
