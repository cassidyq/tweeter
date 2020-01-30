/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  function getDaysAgo(timeOfTweet) {
    const current = new Date();
    const postDate = new Date(timeOfTweet);

    const dateDifference = current.getTime() - postDate.getTime();
    const differenceInDays = dateDifference / (1000 * 3600 * 24);

    return `${Math.floor(differenceInDays)} days ago`;
  }

  const renderTweets = function(tweetsData) {
    //order the tweets based on their dates created from earliest to oldest
    const byDate = tweetsData.slice(0);
    byDate.sort(function(a, b) {
      return a.created_at - b.created_at;
    });

    // loops through sorted tweets
    for (const tweet of byDate) {
      let $tweet = createTweetElement(tweet); // calls createTweetElement for each tweet
      $("#posted-tweets").prepend($tweet); // takes return value and appends it to the tweets-container
    }
  };

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweetData) {
    const tweetArticle = `
    <article>
      <header class="tweet-header">
        <div class="align-center">
          <img
            class="avatar-sm"
            src= ${escape(tweetData.user.avatars)}
            alt="Avatar"
          />
          <span>${escape(tweetData.user.name)}</span>
        </div>
        <span class="show-on-hover">${escape(tweetData.user.handle)}</span>
      </header>
      <div class="tweet-body">${escape(tweetData.content.text)}</div>
      <footer class="tweet-footer">
        <span>${getDaysAgo(tweetData.created_at)}</span>
        <span>
          <i class="fas fa-flag">&nbsp;</i>
          <i class="fas fa-retweet">&nbsp;</i>
          <i class="fas fa-heart"></i>
        </span>
      </footer>
    </article>
  `;

    return $(tweetArticle).addClass("tweet");
  };

  const loadTweets = function() {
    $("#posted-tweets").empty();
    $.ajax({
      url: "/tweets",
      success: data => {
        renderTweets(data);
      }
    });
  };

  // upon new tweet submission, validate that it is the right length then post it and reload all tweets
  $(function() {
    const $form = $("#create-new-tweet");
    $form.submit(function(event) {
      event.preventDefault();
      const input = $("#tweet-input").val();
      if (input.length === 0) {
        alert("You haven't written anything yet!");
      } else if (input.length > 140) {
        alert("Your tweet is too long!");
      } else {
        $.ajax({
          url: "/tweets",
          method: "POST",
          data: $form.serialize(),
          success: function() {
            $("#tweet-input").val("");
            $("#char-counter").text("140");
            loadTweets();
          }
        });
      }
    });
  });

  // on click of arrow in nav display the new tweet section
  $("#scroll-arrow").click(function(event) {
    event.preventDefault();
    $(".new-tweet").slideToggle("slow");
    $("#tweet-input").focus();
  });

  // when scrolling down the page display the "scroll up" button
  $(window).scroll(function() {
    if ($(window).scrollTop() > 500) {
      $(".scrollTopBtn").addClass("show");
    } else {
      $(".scrollTopBtn").removeClass("show");
    }
  });

  // when "scroll up" button is clicked scroll to top of page and display new tweet section
  $(".scrollTopBtn").click(function(event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    if ($(".new-tweet").is(":hidden")) {
      $(".new-tweet").slideToggle("slow");
    }
    $("#tweet-input").focus();
  });

  loadTweets();
});
