-- SMARTDOCK: initial schema for MariaDB 10.6+.
-- Select the intended database and inspect existing tables BEFORE importing.
-- DDL commits implicitly. No DROP, data deletion, users, grants or sample data.
-- Deliberately fail on existing table names; do not hide schema conflicts.
SET NAMES utf8mb4;
SET time_zone = '+00:00';

CREATE TABLE sd_newsletter_subscribers (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  email VARCHAR(254) NOT NULL,
  email_normalized VARCHAR(254) COLLATE utf8mb4_bin NOT NULL,
  language VARCHAR(10) NOT NULL DEFAULT 'de',
  status ENUM('pending','confirmed','unsubscribed','blocked') NOT NULL DEFAULT 'pending',
  consent_version VARCHAR(64) NOT NULL,
  consent_text TEXT NOT NULL,
  consented_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  confirmed_at DATETIME(6) NULL,
  unsubscribed_at DATETIME(6) NULL,
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  UNIQUE KEY uq_sd_subscriber_email (email_normalized),
  KEY ix_sd_subscriber_status (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE sd_newsletter_tokens (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  subscriber_id BIGINT UNSIGNED NOT NULL,
  purpose ENUM('confirm','unsubscribe') NOT NULL,
  token_hash BINARY(32) NOT NULL,
  expires_at DATETIME(6) NOT NULL,
  consumed_at DATETIME(6) NULL,
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  UNIQUE KEY uq_sd_token_hash (token_hash),
  KEY ix_sd_token_subscriber (subscriber_id, purpose),
  KEY ix_sd_token_expiry (expires_at),
  CONSTRAINT fk_sd_token_subscriber FOREIGN KEY (subscriber_id)
    REFERENCES sd_newsletter_subscribers (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE sd_newsletter_events (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  subscriber_id BIGINT UNSIGNED NOT NULL,
  event_type ENUM('signup_requested','confirmed','unsubscribed','blocked') NOT NULL,
  consent_version VARCHAR(64) NULL,
  consent_text TEXT NULL,
  occurred_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  KEY ix_sd_event_subscriber (subscriber_id, occurred_at),
  CONSTRAINT fk_sd_event_subscriber FOREIGN KEY (subscriber_id)
    REFERENCES sd_newsletter_subscribers (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE sd_configuration_requests (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  public_reference CHAR(36) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  idempotency_key BINARY(32) NULL,
  contact_name VARCHAR(200) NOT NULL,
  email VARCHAR(254) NOT NULL,
  company VARCHAR(200) NULL,
  phone VARCHAR(50) NULL,
  language VARCHAR(10) NOT NULL DEFAULT 'de',
  configuration_version VARCHAR(64) NOT NULL,
  selection_json JSON NOT NULL,
  price_snapshot_json JSON NULL,
  privacy_notice_version VARCHAR(64) NOT NULL,
  privacy_acknowledged_at DATETIME(6) NOT NULL,
  status ENUM('new','in_progress','completed','archived') NOT NULL DEFAULT 'new',
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updated_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  UNIQUE KEY uq_sd_request_reference (public_reference),
  UNIQUE KEY uq_sd_request_idempotency (idempotency_key),
  KEY ix_sd_request_status (status, created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE sd_mail_outbox (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  subscriber_id BIGINT UNSIGNED NULL,
  configuration_request_id BIGINT UNSIGNED NULL,
  message_type ENUM('newsletter_confirmation','configuration_confirmation','configuration_notification') NOT NULL,
  recipient_email VARCHAR(254) NOT NULL,
  template_version VARCHAR(64) NOT NULL,
  payload_json JSON NULL,
  deduplication_key VARCHAR(191) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  status ENUM('queued','processing','sent','failed','cancelled') NOT NULL DEFAULT 'queued',
  attempts INT UNSIGNED NOT NULL DEFAULT 0,
  available_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  locked_at DATETIME(6) NULL,
  locked_by VARCHAR(64) NULL,
  sent_at DATETIME(6) NULL,
  last_error TEXT NULL,
  created_at DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (id),
  UNIQUE KEY uq_sd_mail_deduplication (deduplication_key),
  KEY ix_sd_mail_queue (status, available_at),
  KEY ix_sd_mail_subscriber (subscriber_id),
  KEY ix_sd_mail_configuration (configuration_request_id),
  CONSTRAINT fk_sd_mail_subscriber FOREIGN KEY (subscriber_id)
    REFERENCES sd_newsletter_subscribers (id) ON DELETE SET NULL,
  CONSTRAINT fk_sd_mail_configuration FOREIGN KEY (configuration_request_id)
    REFERENCES sd_configuration_requests (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
