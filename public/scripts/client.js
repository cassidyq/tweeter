/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac"
      },
      content: {
        text:
          "If I have seen further it is by standing on the shoulders of giants"
      },
      created_at: 1571179200000
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd"
      },
      content: {
        text: "Je pense , donc je suis"
      },
      created_at: 1570029200000
    },
    {
      user: {
        name: "Cassidy",
        avatars: "https://i.imgur.com/z5LNkkB.png",
        handle: "@cassidyq"
      },
      content: {
        text: "This is the most recent tweet"
      },
      created_at: 1580029200000
    }
  ];

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

  const createTweetElement = function(tweetData) {
    const tweetArticle = `
    <article>
      <header class="tweet-header">
        <div class="align-center">
          <img
            class="avatar-sm"
            src= ${tweetData.user.avatars}
            alt="Avatar"
          />
          <span>${tweetData.user.name}</span>
        </div>
        <span class="show-on-hover">${tweetData.user.handle}</span>
      </header>
      <div class="tweet-body">${tweetData.content.text}</div>
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

  const tweetData = {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac"
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1570029200000
  };

  $(function() {
    const $form = $("#create-new-tweet");
    $form.submit(function(event) {
      event.preventDefault();
      console.log($form.serialize());
      $.ajax({
        url: "/tweets",
        method: "POST",
        data: $form.serialize(),
        success: $("#tweet-input").val("")
      });
    });
  });

  renderTweets(data);
});
