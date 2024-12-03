CREATE TABLE `users` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text(256) NOT NULL,
	`email` text(256) NOT NULL,
	`hashed_password` text(256),
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);