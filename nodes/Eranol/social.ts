import type { IDataObject, INodeProperties } from 'n8n-workflow';

/**
 * Field and routing definitions for the "Social" resource: structured,
 * platform-specific UIs for publishing to and managing scheduled posts on
 * Instagram, TikTok, YouTube, and X — instead of the raw JSON body used by
 * the Universal resource.
 *
 * Source: https://www.eranol.com/documentation (per-endpoint pages).
 */

export type SocialPlatform = 'instagram' | 'tiktok' | 'youtube' | 'x';

export type SocialOperation =
	| 'publish'
	| 'listScheduled'
	| 'cancelScheduled'
	| 'getStatus';

export const SOCIAL_PLATFORM_OPTIONS = [
	{ name: 'Instagram', value: 'instagram' },
	{ name: 'TikTok', value: 'tiktok' },
	{ name: 'X', value: 'x' },
	{ name: 'YouTube', value: 'youtube' },
];

/** Operations available per platform, in display order. */
const OPERATIONS_BY_PLATFORM: Record<
	SocialPlatform,
	Array<{ name: string; value: SocialOperation; action: string; description: string }>
> = {
	instagram: [
		{
			name: 'Publish',
			value: 'publish',
			action: 'Publish to Instagram',
			description: 'Publish a Reel or image to Instagram, or schedule it for later',
		},
		{
			name: 'List Scheduled',
			value: 'listScheduled',
			action: 'List scheduled Instagram posts',
			description: 'List all scheduled Instagram posts across every status',
		},
		{
			name: 'Cancel Scheduled',
			value: 'cancelScheduled',
			action: 'Cancel a scheduled Instagram post',
			description: 'Cancel a pending scheduled Instagram post and refund its credits',
		},
	],
	tiktok: [
		{
			name: 'Publish',
			value: 'publish',
			action: 'Publish to TikTok',
			description: 'Publish a video to TikTok, or schedule it for later',
		},
		{
			name: 'Get Status',
			value: 'getStatus',
			action: 'Get TikTok publish status',
			description: 'Poll the status of a TikTok publish by publish ID',
		},
		{
			name: 'List Scheduled',
			value: 'listScheduled',
			action: 'List scheduled TikTok posts',
			description: 'List all scheduled TikTok posts across every status',
		},
		{
			name: 'Cancel Scheduled',
			value: 'cancelScheduled',
			action: 'Cancel a scheduled TikTok post',
			description: 'Cancel a pending scheduled TikTok post and refund its credits',
		},
	],
	youtube: [
		{
			name: 'Publish',
			value: 'publish',
			action: 'Publish to YouTube',
			description: 'Publish a video to YouTube, or schedule it for later',
		},
		{
			name: 'List Scheduled',
			value: 'listScheduled',
			action: 'List scheduled YouTube posts',
			description: 'List all scheduled YouTube posts across every status',
		},
		{
			name: 'Cancel Scheduled',
			value: 'cancelScheduled',
			action: 'Cancel a scheduled YouTube post',
			description: 'Cancel a pending scheduled YouTube post and refund its credits',
		},
	],
	x: [
		{
			name: 'Publish',
			value: 'publish',
			action: 'Publish to X',
			description: 'Publish a post to X, or schedule it for later',
		},
		{
			name: 'List Scheduled',
			value: 'listScheduled',
			action: 'List scheduled X posts',
			description: 'List all scheduled X posts across every status',
		},
		{
			name: 'Cancel Scheduled',
			value: 'cancelScheduled',
			action: 'Cancel a scheduled X post',
			description: 'Cancel a pending scheduled X post and refund its credits',
		},
	],
};

const PLATFORMS: SocialPlatform[] = ['instagram', 'tiktok', 'youtube', 'x'];

/** Operation picker, shown once per platform. */
const operationFields: INodeProperties[] = PLATFORMS.map((platform) => ({
	displayName: 'Operation',
	name: 'socialOperation',
	type: 'options',
	noDataExpression: true,
	displayOptions: {
		show: {
			resource: ['social'],
			platform: [platform],
		},
	},
	options: OPERATIONS_BY_PLATFORM[platform],
	default: 'publish',
}));

function show(
	platform: SocialPlatform,
	operation: SocialOperation | SocialOperation[],
): INodeProperties['displayOptions'] {
	return {
		show: {
			resource: ['social'],
			platform: [platform],
			socialOperation: Array.isArray(operation) ? operation : [operation],
		},
	};
}

/** Fields shared by every "publish" form: a Schedule For override. */
function scheduleField(platform: SocialPlatform): INodeProperties {
	return {
		displayName: 'Schedule For',
		name: 'scheduledFor',
		type: 'dateTime',
		default: '',
		description:
			'Optional ISO 8601 future timestamp. Leave empty to publish immediately, or set to schedule the post for later.',
		displayOptions: show(platform, 'publish'),
	};
}

/** Fields shared by "list scheduled": none — just the platform + operation pickers. */

/** Fields shared by "cancel scheduled": the scheduled post ID. */
function scheduledPostIdField(platform: SocialPlatform): INodeProperties {
	return {
		displayName: 'Scheduled Post ID',
		name: 'scheduledPostId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the scheduled post to cancel, from the List Scheduled operation',
		displayOptions: show(platform, 'cancelScheduled'),
	};
}

const instagramFields: INodeProperties[] = [
	{
		displayName: 'Media URL',
		name: 'mediaUrl',
		type: 'string',
		default: '',
		required: true,
		description: 'URL of the media to publish. Must be hosted on eranol.com or www.eranol.com.',
		displayOptions: show('instagram', 'publish'),
	},
	{
		displayName: 'Media Type',
		name: 'mediaType',
		type: 'options',
		options: [
			{ name: 'Reel', value: 'REEL' },
			{ name: 'Image', value: 'IMAGE' },
		],
		default: 'REEL',
		displayOptions: show('instagram', 'publish'),
	},
	{
		displayName: 'Caption',
		name: 'caption',
		type: 'string',
		typeOptions: { rows: 3 },
		default: '',
		description: 'Up to 2200 characters',
		displayOptions: show('instagram', 'publish'),
	},
	{
		displayName: 'Share to Feed',
		name: 'shareToFeed',
		type: 'boolean',
		default: true,
		description: 'Whether to also share the Reel to the main feed (Reels only)',
		displayOptions: show('instagram', 'publish'),
	},
	scheduleField('instagram'),
	scheduledPostIdField('instagram'),
];

const tiktokFields: INodeProperties[] = [
	{
		displayName: 'Video URL',
		name: 'videoUrl',
		type: 'string',
		default: '',
		required: true,
		description: 'URL of the video to publish',
		displayOptions: show('tiktok', 'publish'),
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		default: '',
		required: true,
		description: 'Video caption/title, e.g. "Check this out! #fyp"',
		displayOptions: show('tiktok', 'publish'),
	},
	{
		displayName: 'Privacy Level',
		name: 'privacyLevel',
		type: 'options',
		options: [
			{ name: 'Public to Everyone', value: 'PUBLIC_TO_EVERYONE' },
			{ name: 'Mutual Follow Friends', value: 'MUTUAL_FOLLOW_FRIENDS' },
			{ name: 'Follower of Creator', value: 'FOLLOWER_OF_CREATOR' },
			{ name: 'Self Only', value: 'SELF_ONLY' },
		],
		default: 'PUBLIC_TO_EVERYONE',
		displayOptions: show('tiktok', 'publish'),
	},
	{
		displayName: 'Disable Duet',
		name: 'disableDuet',
		type: 'boolean',
		default: false,
		displayOptions: show('tiktok', 'publish'),
	},
	{
		displayName: 'Disable Stitch',
		name: 'disableStitch',
		type: 'boolean',
		default: false,
		displayOptions: show('tiktok', 'publish'),
	},
	{
		displayName: 'Disable Comment',
		name: 'disableComment',
		type: 'boolean',
		default: false,
		displayOptions: show('tiktok', 'publish'),
	},
	scheduleField('tiktok'),
	{
		displayName: 'Publish ID',
		name: 'publishId',
		type: 'string',
		default: '',
		required: true,
		description: 'The publish ID returned by the Publish operation',
		displayOptions: show('tiktok', 'getStatus'),
	},
	scheduledPostIdField('tiktok'),
];

const youtubeFields: INodeProperties[] = [
	{
		displayName: 'Video URL',
		name: 'videoUrl',
		type: 'string',
		default: '',
		required: true,
		description: 'URL of the video to publish. Must be hosted on eranol.com or www.eranol.com.',
		displayOptions: show('youtube', 'publish'),
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		default: '',
		required: true,
		description: 'Up to 100 characters',
		displayOptions: show('youtube', 'publish'),
	},
	{
		displayName: 'Privacy Status',
		name: 'privacyStatus',
		type: 'options',
		options: [
			{ name: 'Public', value: 'public' },
			{ name: 'Unlisted', value: 'unlisted' },
			{ name: 'Private', value: 'private' },
		],
		default: 'public',
		required: true,
		displayOptions: show('youtube', 'publish'),
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		typeOptions: { rows: 4 },
		default: '',
		description: 'Up to 5000 characters',
		displayOptions: show('youtube', 'publish'),
	},
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'string',
		default: '',
		description: 'Comma-separated list of tags, up to 30',
		displayOptions: show('youtube', 'publish'),
	},
	{
		displayName: 'Category ID',
		name: 'categoryId',
		type: 'string',
		default: '22',
		description: 'YouTube category ID; defaults to 22 (People & Blogs)',
		displayOptions: show('youtube', 'publish'),
	},
	{
		displayName: 'Made for Kids',
		name: 'madeForKids',
		type: 'boolean',
		default: false,
		displayOptions: show('youtube', 'publish'),
	},
	scheduleField('youtube'),
	scheduledPostIdField('youtube'),
];

const xFields: INodeProperties[] = [
	{
		displayName: 'Text',
		name: 'text',
		type: 'string',
		typeOptions: { rows: 3 },
		default: '',
		required: true,
		description: 'Post content (280 characters default; ~25,000 for Premium/Blue accounts)',
		displayOptions: show('x', 'publish'),
	},
	{
		displayName: 'Media URLs',
		name: 'mediaUrls',
		type: 'string',
		default: '',
		description:
			'Comma-separated list of up to 4 image URLs, hosted on eranol.com or www.eranol.com',
		displayOptions: show('x', 'publish'),
	},
	scheduleField('x'),
	scheduledPostIdField('x'),
];

export const socialFields: INodeProperties[] = [
	{
		displayName: 'Platform',
		name: 'platform',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['social'],
			},
		},
		options: SOCIAL_PLATFORM_OPTIONS,
		default: 'instagram',
	},
	...operationFields,
	...instagramFields,
	...tiktokFields,
	...youtubeFields,
	...xFields,
];

/** Route each platform's operation to its HTTP method + URL path. */
export function getSocialRoute(
	platform: SocialPlatform,
	operation: SocialOperation,
	idParam?: string,
): { method: 'GET' | 'POST' | 'DELETE'; url: string } {
	if (operation === 'publish') {
		return { method: 'POST', url: `/social/${platform}/publish` };
	}
	if (operation === 'getStatus') {
		return { method: 'GET', url: `/social/${platform}/status` };
	}
	if (operation === 'listScheduled') {
		return { method: 'GET', url: `/social/${platform}/scheduled-posts` };
	}
	// cancelScheduled
	return { method: 'DELETE', url: `/social/${platform}/scheduled-posts/${idParam}` };
}

/** Build the publish request body for a platform from its resolved node parameters. */
export function buildPublishBody(
	platform: SocialPlatform,
	params: IDataObject,
): IDataObject {
	const scheduledFor = params.scheduledFor as string;
	const scheduling: IDataObject = scheduledFor ? { scheduled_for: scheduledFor } : {};

	if (platform === 'instagram') {
		const body: IDataObject = {
			media_url: params.mediaUrl,
			media_type: params.mediaType,
			...scheduling,
		};
		if (params.caption) body.caption = params.caption;
		if (params.mediaType === 'REEL') body.share_to_feed = params.shareToFeed;
		return body;
	}

	if (platform === 'tiktok') {
		// TikTok uses its own field name for scheduling, unlike the other
		// platforms' shared `scheduled_for`.
		const tiktokScheduling: IDataObject = scheduledFor
			? { scheduled_publish_time: scheduledFor }
			: {};
		return {
			video_url: params.videoUrl,
			title: params.title,
			privacy_level: params.privacyLevel,
			disable_duet: params.disableDuet,
			disable_stitch: params.disableStitch,
			disable_comment: params.disableComment,
			...tiktokScheduling,
		};
	}

	if (platform === 'youtube') {
		const body: IDataObject = {
			video_url: params.videoUrl,
			title: params.title,
			privacy_status: params.privacyStatus,
			made_for_kids: params.madeForKids,
			...scheduling,
		};
		if (params.description) body.description = params.description;
		if (params.categoryId) body.category_id = params.categoryId;
		const tags = (params.tags as string) || '';
		if (tags.trim()) {
			body.tags = tags
				.split(',')
				.map((tag) => tag.trim())
				.filter(Boolean);
		}
		return body;
	}

	// x
	const body: IDataObject = {
		text: params.text,
		...scheduling,
	};
	const mediaUrls = (params.mediaUrls as string) || '';
	if (mediaUrls.trim()) {
		body.media_urls = mediaUrls
			.split(',')
			.map((url) => url.trim())
			.filter(Boolean);
	}
	return body;
}
