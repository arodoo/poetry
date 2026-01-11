-- Poetry Database Schema
-- Generated at: 2026-01-11T20:50:22.833489600Z

-- Table: auth
CREATE TABLE "auth" (
  "deleted" bool NOT NULL,
  "id" varchar(255) NOT NULL,
  "username" varchar(255)
);

-- Table: auth_audit_events
CREATE TABLE "auth_audit_events" (
  "created_at" timestamptz NOT NULL,
  "id" int8 NOT NULL,
  "correlation_id" varchar(64),
  "event_type" varchar(64) NOT NULL,
  "subject" varchar(128),
  "detail" varchar(256)
);

-- Table: auth_refresh_tokens
CREATE TABLE "auth_refresh_tokens" (
  "expires_at" timestamptz NOT NULL,
  "id" int8 NOT NULL,
  "issued_at" timestamptz NOT NULL,
  "revoked_at" timestamptz,
  "rotated_at" timestamptz,
  "user_id" int8 NOT NULL,
  "status" varchar(16) NOT NULL,
  "parent_token_value" varchar(128),
  "token_value" varchar(128) NOT NULL,
  "revoke_reason" varchar(255)
);

-- Table: dashboards
CREATE TABLE "dashboards" (
  "created_at" timestamptz NOT NULL,
  "id" int8 NOT NULL,
  "name" varchar(80) NOT NULL,
  "slug" varchar(80) NOT NULL,
  "description" varchar(160)
);

-- Table: events
CREATE TABLE "events" (
  "latitude" float8(17) NOT NULL,
  "longitude" float8(17) NOT NULL,
  "created_at" timestamptz NOT NULL,
  "deleted_at" timestamptz,
  "event_date" timestamptz NOT NULL,
  "id" int8 NOT NULL,
  "updated_at" timestamptz NOT NULL,
  "user_id" int8 NOT NULL,
  "version" int8,
  "status" varchar(20) NOT NULL,
  "title" varchar(200) NOT NULL,
  "image_url" varchar(500),
  "description" text(2147483647),
  "location_name" varchar(255)
);

-- Table: fingerprint_slot_history
CREATE TABLE "fingerprint_slot_history" (
  "r503_slot_id" int4 NOT NULL,
  "assigned_at" timestamptz NOT NULL,
  "fingerprint_id" int8 NOT NULL,
  "id" int8 NOT NULL,
  "released_at" timestamptz,
  "user_id" int8 NOT NULL,
  "version" int8,
  "reason" varchar(30) NOT NULL
);

-- Table: fingerprints
CREATE TABLE "fingerprints" (
  "r503_slot_id" int4,
  "archived_at" timestamptz,
  "created_at" timestamptz NOT NULL,
  "deleted_at" timestamptz,
  "enrolled_at" timestamptz NOT NULL,
  "id" int8 NOT NULL,
  "last_activity_at" timestamptz,
  "updated_at" timestamptz NOT NULL,
  "user_id" int8 NOT NULL,
  "version" int8,
  "status" varchar(20) NOT NULL,
  "template_backup" oid(10)
);

-- Table: font_asset_weights
CREATE TABLE "font_asset_weights" (
  "weight_value" int4,
  "font_asset_id" int8 NOT NULL
);

-- Table: font_assets
CREATE TABLE "font_assets" (
  "is_active" bool,
  "preload_default" bool,
  "deleted_at" timestamptz,
  "id" int8 NOT NULL,
  "font_key" varchar(50) NOT NULL,
  "label" varchar(80) NOT NULL,
  "hash" varchar(120) NOT NULL,
  "integrity" varchar(160),
  "woff2_url" varchar(255) NOT NULL
);

-- Table: i18n_entity
CREATE TABLE "i18n_entity" (
  "id" int8 NOT NULL,
  "default_locale" varchar(255)
);

-- Table: i18n_entity_supported_locales
CREATE TABLE "i18n_entity_supported_locales" (
  "i18n_entity_id" int8 NOT NULL,
  "supported_locales" varchar(255)
);

-- Table: idempotency_records
CREATE TABLE "idempotency_records" (
  "response_status" int4,
  "created_at" timestamptz,
  "id" int8 NOT NULL,
  "request_hash" varchar(64),
  "response_content_type" varchar(64),
  "key_value" varchar(128) NOT NULL,
  "response_body" oid(10)
);

-- Table: membership_zones
CREATE TABLE "membership_zones" (
  "membership_id" int8 NOT NULL,
  "zone_id" int8
);

-- Table: memberships
CREATE TABLE "memberships" (
  "all_zones" bool NOT NULL,
  "created_at" timestamptz NOT NULL,
  "deleted_at" timestamptz,
  "id" int8 NOT NULL,
  "subscription_id" int8 NOT NULL,
  "updated_at" timestamptz NOT NULL,
  "user_id" int8 NOT NULL,
  "version" int8,
  "status" varchar(20) NOT NULL,
  "seller_code" varchar(100) NOT NULL
);

-- Table: seller_codes
CREATE TABLE "seller_codes" (
  "created_at" timestamptz NOT NULL,
  "deleted_at" timestamptz,
  "id" int8 NOT NULL,
  "updated_at" timestamptz NOT NULL,
  "user_id" int8 NOT NULL,
  "version" int8,
  "status" varchar(20) NOT NULL,
  "code" varchar(100) NOT NULL,
  "organization_id" varchar(100) NOT NULL
);

-- Table: subscription_features
CREATE TABLE "subscription_features" (
  "subscription_id" int8 NOT NULL,
  "feature" varchar(255)
);

-- Table: subscriptions
CREATE TABLE "subscriptions" (
  "currency" varchar(3) NOT NULL,
  "duration_days" int4 NOT NULL,
  "price" numeric(10) NOT NULL,
  "created_at" timestamptz NOT NULL,
  "deleted_at" timestamptz,
  "id" int8 NOT NULL,
  "updated_at" timestamptz NOT NULL,
  "version" int8,
  "status" varchar(20) NOT NULL,
  "name" varchar(100) NOT NULL,
  "description" varchar(500)
);

-- Table: theme_colors
CREATE TABLE "theme_colors" (
  "theme_id" int8 NOT NULL,
  "color_key" varchar(255) NOT NULL,
  "color_value" varchar(255)
);

-- Table: themes
CREATE TABLE "themes" (
  "is_active" bool,
  "deleted_at" timestamptz,
  "id" int8 NOT NULL,
  "name" varchar(50) NOT NULL,
  "theme_key" varchar(50) NOT NULL
);

-- Table: ui_customization_selection
CREATE TABLE "ui_customization_selection" (
  "id" int8 NOT NULL,
  "font_key" varchar(50) NOT NULL,
  "font_size_key" varchar(50) NOT NULL,
  "radius_key" varchar(50) NOT NULL,
  "shadow_key" varchar(50) NOT NULL,
  "spacing_key" varchar(50) NOT NULL,
  "theme_key" varchar(50) NOT NULL
);

-- Table: user_customization_selection
CREATE TABLE "user_customization_selection" (
  "id" int8 NOT NULL,
  "user_id" int8 NOT NULL,
  "font_key" varchar(50) NOT NULL,
  "font_size_key" varchar(50) NOT NULL,
  "radius_key" varchar(50) NOT NULL,
  "shadow_key" varchar(50) NOT NULL,
  "spacing_key" varchar(50) NOT NULL,
  "theme_key" varchar(50) NOT NULL
);

-- Table: user_fingerprints
CREATE TABLE "user_fingerprints" (
  "is_active" bool NOT NULL,
  "enrolled_at" timestamptz NOT NULL,
  "fingerprint_id" int8 NOT NULL,
  "id" int8 NOT NULL,
  "user_id" int8 NOT NULL,
  "version" int8 NOT NULL
);

-- Table: user_has_membership
CREATE TABLE "user_has_membership" (
  "id" int8 NOT NULL,
  "created_at" timestamptz NOT NULL,
  "end_date" timestamptz NOT NULL,
  "seller_code" varchar(100) NOT NULL,
  "start_date" timestamptz NOT NULL,
  "status" varchar(20) NOT NULL,
  "subscription_id" int8 NOT NULL,
  "updated_at" timestamptz NOT NULL,
  "user_id" int8 NOT NULL,
  "version" int8
);

-- Table: user_membership_zones
CREATE TABLE "user_membership_zones" (
  "id" int8 NOT NULL,
  "membership_id" int8 NOT NULL,
  "zone_id" int8 NOT NULL
);

-- Table: user_roles
CREATE TABLE "user_roles" (
  "user_id" int8 NOT NULL,
  "role" varchar(255)
);

-- Table: users
CREATE TABLE "users" (
  "created_at" timestamptz NOT NULL,
  "deleted_at" timestamptz,
  "id" int8 NOT NULL,
  "updated_at" timestamptz NOT NULL,
  "version" int8,
  "locale" varchar(10) NOT NULL,
  "status" varchar(20) NOT NULL,
  "password_hash" varchar(72),
  "email" varchar(255) NOT NULL,
  "first_name" varchar(255),
  "last_name" varchar(255),
  "username" varchar(255) NOT NULL
);

-- Table: zones
CREATE TABLE "zones" (
  "created_at" timestamptz NOT NULL,
  "deleted_at" timestamptz,
  "id" int8 NOT NULL,
  "manager_id" int8 NOT NULL,
  "updated_at" timestamptz NOT NULL,
  "version" int8,
  "status" varchar(20) NOT NULL,
  "name" varchar(100) NOT NULL,
  "description" varchar(500)
);

