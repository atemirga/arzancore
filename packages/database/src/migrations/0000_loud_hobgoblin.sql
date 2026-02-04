CREATE TABLE IF NOT EXISTS "available_modules" (
	"id" varchar(50) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"short_description" varchar(500),
	"category" varchar(50) NOT NULL,
	"icon" varchar(100),
	"logo" text,
	"screenshots" jsonb,
	"is_base_product" boolean DEFAULT false,
	"dependencies" jsonb,
	"features" jsonb,
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"is_beta" boolean DEFAULT false,
	"is_coming_soon" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"portal_id" uuid NOT NULL,
	"subscription_id" uuid,
	"stripe_invoice_id" varchar(255),
	"number" varchar(100),
	"subtotal" numeric(10, 2) NOT NULL,
	"tax" numeric(10, 2) DEFAULT '0',
	"total" numeric(10, 2) NOT NULL,
	"amount_paid" numeric(10, 2) DEFAULT '0',
	"amount_due" numeric(10, 2) NOT NULL,
	"currency" varchar(3) DEFAULT 'USD',
	"status" varchar(20) NOT NULL,
	"period_start" timestamp,
	"period_end" timestamp,
	"due_date" timestamp,
	"paid_at" timestamp,
	"lines" jsonb,
	"invoice_pdf" text,
	"hosted_invoice_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "module_addons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"module_id" varchar(50) NOT NULL,
	"addon_type" varchar(50) NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"price_monthly" numeric(10, 2) NOT NULL,
	"price_yearly" numeric(10, 2) NOT NULL,
	"currency" varchar(3) DEFAULT 'USD',
	"stripe_price_id_monthly" varchar(255),
	"stripe_price_id_yearly" varchar(255),
	"unit" varchar(50) NOT NULL,
	"unit_amount" integer NOT NULL,
	"is_stackable" boolean DEFAULT true,
	"max_quantity" integer,
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "module_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"module_id" varchar(50) NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"price_monthly" numeric(10, 2) NOT NULL,
	"price_yearly" numeric(10, 2) NOT NULL,
	"currency" varchar(3) DEFAULT 'USD',
	"stripe_price_id_monthly" varchar(255),
	"stripe_price_id_yearly" varchar(255),
	"limits" jsonb,
	"features" jsonb,
	"is_popular" boolean DEFAULT false,
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "oauth_accounts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"provider" varchar(50) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"token_expires_at" timestamp,
	"profile" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payment_methods" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"portal_id" uuid NOT NULL,
	"stripe_payment_method_id" varchar(255) NOT NULL,
	"stripe_customer_id" varchar(255) NOT NULL,
	"type" varchar(20) NOT NULL,
	"card" jsonb,
	"is_default" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"portal_id" uuid NOT NULL,
	"invoice_id" uuid,
	"subscription_id" uuid,
	"stripe_payment_intent_id" varchar(255),
	"stripe_charge_id" varchar(255),
	"amount" numeric(10, 2) NOT NULL,
	"currency" varchar(3) DEFAULT 'USD',
	"status" varchar(20) NOT NULL,
	"payment_method_id" uuid,
	"payment_method_type" varchar(20),
	"failure_code" varchar(100),
	"failure_message" text,
	"refunded_amount" numeric(10, 2),
	"refunded_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portal_addons" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"portal_id" uuid NOT NULL,
	"module_id" varchar(50) NOT NULL,
	"addon_id" uuid NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"status" varchar(20) DEFAULT 'active',
	"stripe_subscription_item_id" varchar(255),
	"activated_at" timestamp DEFAULT now(),
	"canceled_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portal_invitations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"portal_id" uuid NOT NULL,
	"email" varchar(255) NOT NULL,
	"role" varchar(50) DEFAULT 'member',
	"custom_role_id" uuid,
	"token" varchar(255) NOT NULL,
	"token_hash" varchar(64) NOT NULL,
	"invited_by" uuid NOT NULL,
	"expires_at" timestamp NOT NULL,
	"accepted_at" timestamp,
	"accepted_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portal_limits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"portal_id" uuid NOT NULL,
	"module_id" varchar(50) NOT NULL,
	"limits" jsonb NOT NULL,
	"usage" jsonb NOT NULL,
	"period_start" timestamp NOT NULL,
	"period_end" timestamp NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portal_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"portal_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"role" varchar(50) DEFAULT 'member',
	"custom_role_id" uuid,
	"status" varchar(20) DEFAULT 'active',
	"invited_by" uuid,
	"invited_at" timestamp,
	"joined_at" timestamp,
	"settings" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portal_modules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"portal_id" uuid NOT NULL,
	"module_id" varchar(50) NOT NULL,
	"plan_id" uuid,
	"status" varchar(20) DEFAULT 'active',
	"settings" jsonb,
	"trial_ends_at" timestamp,
	"activated_at" timestamp DEFAULT now(),
	"suspended_at" timestamp,
	"canceled_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portal_settings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"portal_id" uuid NOT NULL,
	"branding" jsonb,
	"regional" jsonb,
	"notifications" jsonb,
	"security" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "portal_settings_portal_id_unique" UNIQUE("portal_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"owner_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"subdomain" varchar(63) NOT NULL,
	"custom_domain" varchar(255),
	"logo" text,
	"favicon" text,
	"settings" jsonb,
	"status" varchar(20) DEFAULT 'active',
	"trial_ends_at" timestamp,
	"suspended_at" timestamp,
	"suspend_reason" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "portals_subdomain_unique" UNIQUE("subdomain")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "promo_code_redemptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"promo_code_id" uuid NOT NULL,
	"portal_id" uuid NOT NULL,
	"subscription_id" uuid,
	"discount_applied" numeric(10, 2),
	"redeemed_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "promo_codes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"code" varchar(50) NOT NULL,
	"discount_type" varchar(20) NOT NULL,
	"discount_value" numeric(10, 2) NOT NULL,
	"currency" varchar(3) DEFAULT 'USD',
	"applicable_modules" jsonb,
	"applicable_plans" jsonb,
	"max_redemptions" integer,
	"current_redemptions" integer DEFAULT 0,
	"max_redemptions_per_portal" integer DEFAULT 1,
	"valid_from" timestamp,
	"valid_until" timestamp,
	"duration_months" integer,
	"stripe_coupon_id" varchar(255),
	"is_active" boolean DEFAULT true,
	"created_by" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "promo_codes_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token" varchar(255) NOT NULL,
	"token_hash" varchar(64) NOT NULL,
	"user_agent" text,
	"ip" varchar(45),
	"device_type" varchar(50),
	"device_name" varchar(255),
	"current_portal_id" uuid,
	"expires_at" timestamp NOT NULL,
	"last_activity_at" timestamp DEFAULT now(),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "subscriptions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"portal_id" uuid NOT NULL,
	"module_id" varchar(50) NOT NULL,
	"plan_id" uuid NOT NULL,
	"stripe_customer_id" varchar(255),
	"stripe_subscription_id" varchar(255),
	"stripe_price_id" varchar(255),
	"status" varchar(20) NOT NULL,
	"billing_interval" varchar(20) NOT NULL,
	"current_period_start" timestamp NOT NULL,
	"current_period_end" timestamp NOT NULL,
	"cancel_at_period_end" boolean DEFAULT false,
	"canceled_at" timestamp,
	"cancel_reason" text,
	"trial_start" timestamp,
	"trial_end" timestamp,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "usage_records" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"portal_id" uuid NOT NULL,
	"module_id" varchar(50) NOT NULL,
	"metric" varchar(50) NOT NULL,
	"value" integer NOT NULL,
	"period_start" timestamp NOT NULL,
	"period_end" timestamp NOT NULL,
	"reported_to_stripe" boolean DEFAULT false,
	"stripe_usage_record_id" varchar(255),
	"recorded_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"phone" varchar(20),
	"name" varchar(255),
	"surname" varchar(255),
	"avatar" text,
	"password_hash" text,
	"email_verified" boolean DEFAULT false,
	"phone_verified" boolean DEFAULT false,
	"two_factor_enabled" boolean DEFAULT false,
	"two_factor_secret" text,
	"backup_codes" jsonb,
	"webauthn_credentials" jsonb,
	"locale" varchar(10) DEFAULT 'ru',
	"timezone" varchar(50) DEFAULT 'Asia/Almaty',
	"settings" jsonb,
	"status" varchar(20) DEFAULT 'active',
	"suspended_at" timestamp,
	"suspend_reason" text,
	"last_login_at" timestamp,
	"last_login_ip" varchar(45),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"type" varchar(50) NOT NULL,
	"token" varchar(255) NOT NULL,
	"token_hash" varchar(64) NOT NULL,
	"expires_at" timestamp NOT NULL,
	"used_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "invoices_portal_id_idx" ON "invoices" ("portal_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "invoices_stripe_invoice_idx" ON "invoices" ("stripe_invoice_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "invoices_status_idx" ON "invoices" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "module_addons_module_id_idx" ON "module_addons" ("module_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "module_addons_addon_type_idx" ON "module_addons" ("addon_type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "module_plans_module_id_idx" ON "module_plans" ("module_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "oauth_accounts_user_id_idx" ON "oauth_accounts" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "oauth_accounts_provider_idx" ON "oauth_accounts" ("provider","provider_account_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "payment_methods_portal_id_idx" ON "payment_methods" ("portal_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "payments_portal_id_idx" ON "payments" ("portal_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "payments_stripe_payment_idx" ON "payments" ("stripe_payment_intent_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "payments_status_idx" ON "payments" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "portal_addons_portal_module_idx" ON "portal_addons" ("portal_id","module_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "portal_addons_portal_addon_idx" ON "portal_addons" ("portal_id","addon_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "portal_invitations_portal_email_idx" ON "portal_invitations" ("portal_id","email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "portal_invitations_token_hash_idx" ON "portal_invitations" ("token_hash");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "portal_limits_portal_module_idx" ON "portal_limits" ("portal_id","module_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "portal_members_portal_user_idx" ON "portal_members" ("portal_id","user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "portal_members_portal_id_idx" ON "portal_members" ("portal_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "portal_members_user_id_idx" ON "portal_members" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "portal_modules_portal_module_idx" ON "portal_modules" ("portal_id","module_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "portal_modules_portal_id_idx" ON "portal_modules" ("portal_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "portal_modules_module_id_idx" ON "portal_modules" ("module_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "portal_modules_status_idx" ON "portal_modules" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "portals_owner_id_idx" ON "portals" ("owner_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "portals_subdomain_idx" ON "portals" ("subdomain");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "portals_custom_domain_idx" ON "portals" ("custom_domain");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "portals_status_idx" ON "portals" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "promo_code_redemptions_promo_code_idx" ON "promo_code_redemptions" ("promo_code_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "promo_code_redemptions_portal_idx" ON "promo_code_redemptions" ("portal_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "promo_codes_code_idx" ON "promo_codes" ("code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "promo_codes_is_active_idx" ON "promo_codes" ("is_active");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sessions_user_id_idx" ON "sessions" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sessions_token_hash_idx" ON "sessions" ("token_hash");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sessions_expires_at_idx" ON "sessions" ("expires_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "subscriptions_portal_id_idx" ON "subscriptions" ("portal_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "subscriptions_module_id_idx" ON "subscriptions" ("module_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "subscriptions_stripe_sub_idx" ON "subscriptions" ("stripe_subscription_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "subscriptions_status_idx" ON "subscriptions" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "usage_records_portal_module_idx" ON "usage_records" ("portal_id","module_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "usage_records_metric_idx" ON "usage_records" ("metric");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "usage_records_period_idx" ON "usage_records" ("period_start","period_end");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_phone_idx" ON "users" ("phone");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "users_status_idx" ON "users" ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "verification_tokens_token_hash_idx" ON "verification_tokens" ("token_hash");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "verification_tokens_user_type_idx" ON "verification_tokens" ("user_id","type");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoices" ADD CONSTRAINT "invoices_portal_id_portals_id_fk" FOREIGN KEY ("portal_id") REFERENCES "portals"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoices" ADD CONSTRAINT "invoices_subscription_id_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "module_addons" ADD CONSTRAINT "module_addons_module_id_available_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "available_modules"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "module_plans" ADD CONSTRAINT "module_plans_module_id_available_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "available_modules"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "oauth_accounts" ADD CONSTRAINT "oauth_accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_portal_id_portals_id_fk" FOREIGN KEY ("portal_id") REFERENCES "portals"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_portal_id_portals_id_fk" FOREIGN KEY ("portal_id") REFERENCES "portals"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_subscription_id_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_payment_method_id_payment_methods_id_fk" FOREIGN KEY ("payment_method_id") REFERENCES "payment_methods"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portal_addons" ADD CONSTRAINT "portal_addons_portal_id_portals_id_fk" FOREIGN KEY ("portal_id") REFERENCES "portals"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portal_addons" ADD CONSTRAINT "portal_addons_module_id_available_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "available_modules"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portal_addons" ADD CONSTRAINT "portal_addons_addon_id_module_addons_id_fk" FOREIGN KEY ("addon_id") REFERENCES "module_addons"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portal_invitations" ADD CONSTRAINT "portal_invitations_portal_id_portals_id_fk" FOREIGN KEY ("portal_id") REFERENCES "portals"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portal_invitations" ADD CONSTRAINT "portal_invitations_invited_by_users_id_fk" FOREIGN KEY ("invited_by") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portal_invitations" ADD CONSTRAINT "portal_invitations_accepted_by_users_id_fk" FOREIGN KEY ("accepted_by") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portal_limits" ADD CONSTRAINT "portal_limits_portal_id_portals_id_fk" FOREIGN KEY ("portal_id") REFERENCES "portals"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portal_limits" ADD CONSTRAINT "portal_limits_module_id_available_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "available_modules"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portal_members" ADD CONSTRAINT "portal_members_portal_id_portals_id_fk" FOREIGN KEY ("portal_id") REFERENCES "portals"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portal_members" ADD CONSTRAINT "portal_members_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portal_members" ADD CONSTRAINT "portal_members_invited_by_users_id_fk" FOREIGN KEY ("invited_by") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portal_modules" ADD CONSTRAINT "portal_modules_portal_id_portals_id_fk" FOREIGN KEY ("portal_id") REFERENCES "portals"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portal_modules" ADD CONSTRAINT "portal_modules_module_id_available_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "available_modules"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portal_modules" ADD CONSTRAINT "portal_modules_plan_id_module_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "module_plans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portal_settings" ADD CONSTRAINT "portal_settings_portal_id_portals_id_fk" FOREIGN KEY ("portal_id") REFERENCES "portals"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portals" ADD CONSTRAINT "portals_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promo_code_redemptions" ADD CONSTRAINT "promo_code_redemptions_promo_code_id_promo_codes_id_fk" FOREIGN KEY ("promo_code_id") REFERENCES "promo_codes"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promo_code_redemptions" ADD CONSTRAINT "promo_code_redemptions_portal_id_portals_id_fk" FOREIGN KEY ("portal_id") REFERENCES "portals"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promo_code_redemptions" ADD CONSTRAINT "promo_code_redemptions_subscription_id_subscriptions_id_fk" FOREIGN KEY ("subscription_id") REFERENCES "subscriptions"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "promo_codes" ADD CONSTRAINT "promo_codes_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_portal_id_portals_id_fk" FOREIGN KEY ("portal_id") REFERENCES "portals"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_module_id_available_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "available_modules"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_plan_id_module_plans_id_fk" FOREIGN KEY ("plan_id") REFERENCES "module_plans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usage_records" ADD CONSTRAINT "usage_records_portal_id_portals_id_fk" FOREIGN KEY ("portal_id") REFERENCES "portals"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "usage_records" ADD CONSTRAINT "usage_records_module_id_available_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "available_modules"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "verification_tokens" ADD CONSTRAINT "verification_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
