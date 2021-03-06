import {BlogEntry} from '../blogentry'

steem.api.setOptions({ url: 'https://api.steemit.com' });


export function createPostHtml (author: string, permlink: string, callback: (error :string|null, result :BlogEntry) => void) : void
{
	steem.api.getContent(author, permlink, function(err, post)
	{
		let result = {} as BlogEntry;

		if(!err && post.body !== "")
		{
			// let markdownContentParser = new MarkdownContentParser();
			// markdownContentParser.Parse(post.body);

			// result.author = post.author;
			// result.body = markdownContentParser.body;
			// result.created = new Date(post.created + '.000Z');
			// result.title = post.title;
			// result.url = post.url;

			callback(null, result);
		}
		else
		{
			callback(err, result);
		}
	});
}

export function createArticleAsync (author: string, permlink: string) : Promise<steem.Post>
{
	return new Promise((resolve,reject) =>
	{
		steem.api.getContent(author, permlink, function(err, post)
		{
			if(!err && post.body !== "")
			{
				resolve(post);
			}
			else
			{
				reject(err);
			}
		});
	});
}

export function getBlogArticles (author: string, limit: number, callback: (error :string|null, result :Array<BlogEntry>) => void) : void
{
	steem.api.getDiscussionsByBlog({tag: 'steemmakers', limit: 20}, function(err, posts) 
	{
		let result: BlogEntry[] = Array();
		if(!err)
		{
			for (var i = 0; i < posts.length; i++) 
			{
				let newEntry = new BlogEntry(posts[i]);
				result.push(newEntry);
			}
			callback(null, result);
		}
		else
		{
			callback(err, result);
		}
	});
}

export function formatDate(date: Date) :string
{
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

	var day = date.getDate();
	var monthIndex = date.getMonth();
	var year = date.getFullYear();

	return day + ' ' + monthNames[monthIndex] + ' ' + year + ', ' + date.getHours() + ':' + date.getMinutes();
}