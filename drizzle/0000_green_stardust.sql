CREATE TABLE `accessories` (
	`id` integer PRIMARY KEY NOT NULL,
	`product_id` text NOT NULL,
	`name` text NOT NULL,
	`game` text NOT NULL,
	`type` text NOT NULL,
	`price` integer NOT NULL,
	`image_url` text,
	`quantity` integer DEFAULT 0 NOT NULL,
	`description` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `accessories_product_id_unique` ON `accessories` (`product_id`);--> statement-breakpoint
CREATE TABLE `admins` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `admins_username_unique` ON `admins` (`username`);--> statement-breakpoint
CREATE TABLE `cart` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` integer NOT NULL,
	`product_id` text NOT NULL,
	`quantity` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL,
	`name` text,
	`address` text,
	`po_box` text,
	`city` text,
	`state` text,
	`zipcode` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);--> statement-breakpoint
CREATE TABLE `magic_singles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`scryfall_id` text NOT NULL,
	`name` text NOT NULL,
	`set_code` text NOT NULL,
	`set_name` text NOT NULL,
	`mana_cost` text,
	`cmc` real,
	`colors` text,
	`color_identity` text,
	`power` text,
	`toughness` text,
	`keywords` text,
	`type_line` text,
	`oracle_text` text,
	`layout` text,
	`card_faces` text,
	`collector_number` text NOT NULL,
	`rarity` text NOT NULL,
	`price` real,
	`foil_price` real,
	`quantity` integer DEFAULT 0,
	`image_small` text,
	`image_normal` text,
	`artist` text,
	`description` text,
	`released_at` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `magic_singles_scryfall_id_unique` ON `magic_singles` (`scryfall_id`);--> statement-breakpoint
CREATE TABLE `pokemon_singles` (
	`id` integer PRIMARY KEY NOT NULL,
	`game` text,
	`category` text,
	`pokemon_id` text,
	`name` text,
	`set_code` text,
	`set_name` text,
	`card_number` text,
	`rarity` text,
	`flavor_text` text,
	`supertype` text,
	`subtypes` text,
	`hp` text,
	`types` text,
	`artist` text,
	`image_small` text,
	`image_large` text,
	`price` real,
	`release_date` text,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP',
	`quantity` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `pokemon_singles_pokemon_id_unique` ON `pokemon_singles` (`pokemon_id`);--> statement-breakpoint
CREATE TABLE `yugioh_printings` (
	`id` integer PRIMARY KEY NOT NULL,
	`yugioh_id` text,
	`set_name` text,
	`set_code` text,
	`rarity` text,
	`card_number` text,
	`price` integer
);
--> statement-breakpoint
CREATE TABLE `yugioh_singles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`yugioh_id` text NOT NULL,
	`name` text NOT NULL,
	`typeline` text,
	`type` text,
	`human_readable_card_type` text,
	`frame_type` text,
	`desc` text,
	`linkmarkers` text,
	`linkval` integer,
	`race` text,
	`atk` integer,
	`def` integer,
	`level` integer,
	`attribute` text,
	`archetype` text,
	`primary_set` text,
	`card_sets` text,
	`card_images` text,
	`price` integer,
	`card_prices` text,
	`set_rarity` text,
	`set_name` text,
	`set_code` text NOT NULL,
	`market_value` integer,
	`image_small` text,
	`image_large` text,
	`quantity` integer DEFAULT 1,
	`created_at` text DEFAULT 'CURRENT_TIMESTAMP'
);
