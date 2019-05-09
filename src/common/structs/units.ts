/**
 * Time-formatted string
 */
export type Time = string;

/**
 * Field is measured in bytes
 */
export type Bytes = number;

/**
 * Field is measured in Megabytes
 */
export type Megabytes = number;

/**
 * Field is measured in Gigabytes
 */
export type Gigabytes = number;

/**
 * Field is measured in microseconds
 */
export type Microseconds = number;

/**
 * Field is measured in Mbps
 */
export type Megabits = number;

/**
 * 1/10th of a cent
 * https://en.wikipedia.org/wiki/Mill_(currency)
 */
export type Mills = number;

/**
 * Field is measured in days
 */
export type Days = number;

/**
 * Field denoting an IP
 */
export type IP = string;

/**
 * a url that cycle is able to call out to
 */
export type Webhook = string;

/** Array of webhooks */
export type Webhooks = Webhook[];

/** Field denoting an email address */
export type Email = string;

/** Array of emails */
export type Emails = Email[];

/** An identifier describing the cluster the server/environment is a member of */
export type Cluster = string;
