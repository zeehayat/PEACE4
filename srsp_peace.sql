-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 28, 2025 at 12:35 PM
-- Server version: 8.0.42-0ubuntu0.24.04.1
-- PHP Version: 8.3.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `srsp_peace`
--

-- --------------------------------------------------------

--
-- Table structure for table `attachments`
--

CREATE TABLE `attachments` (
  `id` bigint UNSIGNED NOT NULL,
  `attachable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `attachable_id` bigint UNSIGNED NOT NULL,
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uploaded_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cbos`
--

CREATE TABLE `cbos` (
  `id` bigint UNSIGNED NOT NULL,
  `reference_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `district` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tehsil` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `village_council` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `village` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_of_formation` date NOT NULL,
  `total_members` int NOT NULL,
  `gender` enum('Male','Female','Mixed') COLLATE utf8mb4_unicode_ci NOT NULL,
  `num_cbo_members` int NOT NULL,
  `president_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `president_contact` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secretary_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secretary_contact` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cbos`
--

INSERT INTO `cbos` (`id`, `reference_code`, `district`, `tehsil`, `village_council`, `village`, `date_of_formation`, `total_members`, `gender`, `num_cbo_members`, `president_name`, `president_contact`, `secretary_name`, `secretary_contact`, `created_at`, `updated_at`) VALUES
(1, '646454', 'Abbottabad', 'asdfasdf', 'sadfadsf', 'asdfadsf', '2025-06-28', 423, 'Male', 23432, 'dsfsdf', '234234', 'asdfads', '234234', '2025-06-28 04:39:44', '2025-06-28 04:39:44');

-- --------------------------------------------------------

--
-- Table structure for table `cbo_dialogues`
--

CREATE TABLE `cbo_dialogues` (
  `id` bigint UNSIGNED NOT NULL,
  `cbo_id` bigint UNSIGNED NOT NULL,
  `date_of_dialogue` date NOT NULL,
  `participants` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cbo_dialogues`
--

INSERT INTO `cbo_dialogues` (`id`, `cbo_id`, `date_of_dialogue`, `participants`, `created_at`, `updated_at`) VALUES
(1, 1, '2025-06-28', 432432, '2025-06-28 05:53:58', '2025-06-28 05:53:58'),
(2, 1, '2025-06-28', 432432, '2025-06-28 05:59:35', '2025-06-28 05:59:35'),
(3, 1, '2025-06-28', 32423, '2025-06-28 06:04:56', '2025-06-28 06:04:56'),
(4, 1, '2025-06-28', 32423, '2025-06-28 06:06:29', '2025-06-28 06:06:29'),
(5, 1, '2025-06-28', 32423, '2025-06-28 06:07:23', '2025-06-28 06:07:23'),
(6, 1, '2025-06-28', 32423, '2025-06-28 06:07:34', '2025-06-28 06:07:34'),
(7, 1, '2025-06-27', 24324, '2025-06-28 06:35:54', '2025-06-28 06:35:54');

-- --------------------------------------------------------

--
-- Table structure for table `cbo_exposure_visits`
--

CREATE TABLE `cbo_exposure_visits` (
  `id` bigint UNSIGNED NOT NULL,
  `cbo_id` bigint UNSIGNED NOT NULL,
  `date_of_visit` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cbo_exposure_visits`
--

INSERT INTO `cbo_exposure_visits` (`id`, `cbo_id`, `date_of_visit`, `created_at`, `updated_at`) VALUES
(1, 1, '2025-06-28', '2025-06-28 07:11:53', '2025-06-28 07:11:53'),
(2, 1, '2025-06-27', '2025-06-28 07:19:54', '2025-06-28 07:19:54');

-- --------------------------------------------------------

--
-- Table structure for table `cbo_trainings`
--

CREATE TABLE `cbo_trainings` (
  `id` bigint UNSIGNED NOT NULL,
  `cbo_id` bigint UNSIGNED NOT NULL,
  `training_type` enum('O&M Training','Electrical Appliance') COLLATE utf8mb4_unicode_ci NOT NULL,
  `training_gender` enum('Male','Female','Mixed') COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_of_training` date NOT NULL,
  `total_participants` int NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `irrigation_admin_approvals`
--

CREATE TABLE `irrigation_admin_approvals` (
  `id` bigint UNSIGNED NOT NULL,
  `irrigation_scheme_id` bigint UNSIGNED NOT NULL,
  `eu_approval_date` date DEFAULT NULL,
  `approved_cost` decimal(15,2) DEFAULT NULL,
  `civil_work_start_date` date DEFAULT NULL,
  `scheme_inauguration_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `irrigation_completions`
--

CREATE TABLE `irrigation_completions` (
  `id` bigint UNSIGNED NOT NULL,
  `irrigation_scheme_id` bigint UNSIGNED NOT NULL,
  `handover_date` date DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `irrigation_schemes`
--

CREATE TABLE `irrigation_schemes` (
  `id` bigint UNSIGNED NOT NULL,
  `cbo_id` bigint UNSIGNED NOT NULL,
  `status` enum('New','Rehabilitation') COLLATE utf8mb4_unicode_ci NOT NULL,
  `beneficiary_farmers` int UNSIGNED DEFAULT NULL,
  `channel_length_km` double DEFAULT NULL,
  `land_area_hectares` double DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint UNSIGNED NOT NULL,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `file_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mime_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `disk` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `conversions_disk` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` bigint UNSIGNED NOT NULL,
  `manipulations` json NOT NULL,
  `custom_properties` json NOT NULL,
  `generated_conversions` json NOT NULL,
  `responsive_images` json NOT NULL,
  `order_column` int UNSIGNED DEFAULT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `uuid` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `model_id` char(36) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `collection_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `name`, `file_name`, `mime_type`, `disk`, `conversions_disk`, `size`, `manipulations`, `custom_properties`, `generated_conversions`, `responsive_images`, `order_column`, `model_type`, `uuid`, `model_id`, `collection_name`, `created_at`, `updated_at`) VALUES
(1, 'MyImage', 'MyImage.JPG', 'image/jpeg', 'public', 'public', 50074, '[]', '[]', '[]', '[]', 1, 'App\\Models\\CboDialogue', 'b38d1493-389e-4d76-b515-38d22984f7ed', '6', 'attachments', '2025-06-28 06:07:34', '2025-06-28 06:07:34'),
(2, '1686588635020', '1686588635020.jpeg', 'image/jpeg', 'public', 'public', 91899, '[]', '[]', '[]', '[]', 2, 'App\\Models\\CboDialogue', '6fb16a98-93d7-4bc1-8bb6-14675bb748ab', '6', 'attachments', '2025-06-28 06:07:34', '2025-06-28 06:07:34'),
(3, 'sunnydesigner', 'sunnydesigner.jpeg', 'image/jpeg', 'public', 'public', 10707, '[]', '[]', '[]', '[]', 3, 'App\\Models\\CboDialogue', '87690a6f-518e-4b46-bb2e-eb1cfd2dc82c', '6', 'attachments', '2025-06-28 06:07:34', '2025-06-28 06:07:34'),
(4, 'MyImage', 'MyImage.JPG', 'image/jpeg', 'public', 'public', 50074, '[]', '[]', '[]', '[]', 1, 'App\\Models\\CboDialogue', '28cbe509-769f-4f81-8406-4e42bf6a81f3', '7', 'attachments', '2025-06-28 06:35:54', '2025-06-28 06:35:54'),
(5, '1686588635020', '1686588635020.jpeg', 'image/jpeg', 'public', 'public', 91899, '[]', '[]', '[]', '[]', 2, 'App\\Models\\CboDialogue', '8d15d651-a4e6-4e9a-9a05-77d3f2aa2b47', '7', 'attachments', '2025-06-28 06:35:54', '2025-06-28 06:35:54'),
(6, 'sunnydesigner', 'sunnydesigner.jpeg', 'image/jpeg', 'public', 'public', 10707, '[]', '[]', '[]', '[]', 3, 'App\\Models\\CboDialogue', 'd00af833-7766-4f4d-9294-6dd7616f20ff', '7', 'attachments', '2025-06-28 06:35:54', '2025-06-28 06:35:54'),
(7, 'MyImage', 'MyImage.JPG', 'image/jpeg', 'public', 'public', 50074, '[]', '[]', '[]', '[]', 1, 'App\\Models\\CboExposureVisit', 'f6a3cc91-5ffd-41f4-8f4e-35eb93fc713f', '2', 'attachments', '2025-06-28 07:19:54', '2025-06-28 07:19:54'),
(8, '1686588635020', '1686588635020.jpeg', 'image/jpeg', 'public', 'public', 91899, '[]', '[]', '[]', '[]', 2, 'App\\Models\\CboExposureVisit', 'ac3800e2-3653-43d0-8e85-8765aac991d9', '2', 'attachments', '2025-06-28 07:19:54', '2025-06-28 07:19:54'),
(9, 'sunnydesigner', 'sunnydesigner.jpeg', 'image/jpeg', 'public', 'public', 10707, '[]', '[]', '[]', '[]', 3, 'App\\Models\\CboExposureVisit', '78dec1bf-6756-4607-9da0-f1de847893c6', '2', 'attachments', '2025-06-28 07:19:54', '2025-06-28 07:19:54');

-- --------------------------------------------------------

--
-- Table structure for table `mhp_admin_approvals`
--

CREATE TABLE `mhp_admin_approvals` (
  `id` bigint UNSIGNED NOT NULL,
  `mhp_site_id` bigint UNSIGNED NOT NULL,
  `eu_approval_date` date DEFAULT NULL,
  `approved_cost` decimal(15,2) DEFAULT NULL,
  `hpp_inauguration_date` date DEFAULT NULL,
  `civil_work_start_date` date DEFAULT NULL,
  `mhp_inauguration_date` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mhp_completions`
--

CREATE TABLE `mhp_completions` (
  `id` bigint UNSIGNED NOT NULL,
  `mhp_site_id` bigint UNSIGNED NOT NULL,
  `scheme_inauguration_date` date DEFAULT NULL,
  `testing_commissioning_date` date DEFAULT NULL,
  `handover_date` date DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mhp_eme_progress`
--

CREATE TABLE `mhp_eme_progress` (
  `id` bigint UNSIGNED NOT NULL,
  `mhp_site_id` bigint UNSIGNED NOT NULL,
  `milestone_percent` int UNSIGNED NOT NULL,
  `progress_date` date DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mhp_sites`
--

CREATE TABLE `mhp_sites` (
  `id` bigint UNSIGNED NOT NULL,
  `cbo_id` bigint UNSIGNED NOT NULL,
  `population` int DEFAULT NULL,
  `grid_status` enum('On-Grid','Off-Grid','Partially on-Grid') COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('New','Rehabilitation','Upgradation') COLLATE utf8mb4_unicode_ci NOT NULL,
  `existing_capacity_kw` int DEFAULT NULL,
  `planned_capacity_kw` int DEFAULT NULL,
  `head_ft` double DEFAULT NULL,
  `design_discharge_cusecs` double DEFAULT NULL,
  `channel_length_km` double DEFAULT NULL,
  `tl_ht_km` double DEFAULT NULL,
  `tl_lt_km` double DEFAULT NULL,
  `transformers` int DEFAULT NULL,
  `turbine_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `alternator_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `accessible` tinyint(1) DEFAULT NULL,
  `domestic_units` int DEFAULT NULL,
  `commercial_units` int DEFAULT NULL,
  `estimated_cost` decimal(15,2) DEFAULT NULL,
  `per_kw_cost` decimal(15,2) DEFAULT NULL,
  `total_hh` int DEFAULT NULL,
  `avg_hh_size` double DEFAULT NULL,
  `cost_per_capita` decimal(15,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2024_01_01_000000_create_vendors_table', 1),
(5, '2025_06_16_135037_add_two_factor_columns_to_users_table', 1),
(6, '2025_06_16_135047_create_personal_access_tokens_table', 1),
(7, '2025_06_26_145656_create_cbo_mis_schema', 1),
(8, '2025_06_26_151259_create_mhp_sites_table', 1),
(9, '2025_06_26_152125_create_mhp_admin_approvals_table', 1),
(10, '2025_06_26_153300_create_project_cost_revisions_table', 1),
(11, '2025_06_26_154130_create_project_financial_installments_table', 1),
(12, '2025_06_26_154811_create_project_physical_progress_table', 1),
(13, '2025_06_26_155546_create_mhp_eme_progress_table', 1),
(14, '2025_06_27_053354_create_mhp_completions_table', 1),
(15, '2025_06_27_054049_create_irrigation_schemes_table', 1),
(16, '2025_06_27_054111_create_irrigation_admin_approvals_table', 1),
(17, '2025_06_27_054134_create_irrigation_completions_table', 1),
(18, '2025_06_27_062035_create_revenue_records_table', 1),
(19, '2025_06_27_062719_create_operational_costs_table', 1),
(20, '2025_06_27_064207_create_om_costs_table', 1),
(21, '2025_06_27_065825_create_procurement_requisitions_table', 1),
(22, '2025_06_27_065835_create_procurement_items_table', 1),
(23, '2025_06_27_065845_create_procurement_quotations_table', 1),
(24, '2025_06_27_065854_create_procurement_orders_table', 1),
(25, '2025_06_27_065901_create_procurement_deliveries_table', 1),
(26, '2025_06_27_065909_create_procurement_payments_table', 1),
(27, '2025_06_27_070133_create_procurement_committee_members_table', 1),
(28, '2025_06_27_070141_create_procurement_committee_reviews_table', 1),
(29, '2025_06_27_070153_create_procurement_final_approvals_table', 1),
(30, '2025_06_27_075825_create_permission_tables', 1),
(31, '2025_06_28_105510_create_media_table', 2),
(32, '2025_06_28_110700_add_uuid_to_media_table', 3);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint UNSIGNED NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(2, 'App\\Models\\User', 1),
(6, 'App\\Models\\User', 2),
(1, 'App\\Models\\User', 3);

-- --------------------------------------------------------

--
-- Table structure for table `om_costs`
--

CREATE TABLE `om_costs` (
  `id` bigint UNSIGNED NOT NULL,
  `mhp_site_id` bigint UNSIGNED NOT NULL,
  `cost_date` date DEFAULT NULL,
  `o_and_m_cost` decimal(12,2) DEFAULT NULL,
  `rehab_reconstruction_cost` decimal(12,2) DEFAULT NULL,
  `repair_civil_work_cost` decimal(12,2) DEFAULT NULL,
  `repair_tnd_cost` decimal(12,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `operational_costs`
--

CREATE TABLE `operational_costs` (
  `id` bigint UNSIGNED NOT NULL,
  `mhp_site_id` bigint UNSIGNED NOT NULL,
  `cost_date` date DEFAULT NULL,
  `hr_office_expenses` decimal(12,2) DEFAULT NULL,
  `financial_charges` decimal(12,2) DEFAULT NULL,
  `insurance_charges` decimal(12,2) DEFAULT NULL,
  `vehicle_operational_cost` decimal(12,2) DEFAULT NULL,
  `management_cost` decimal(12,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'view_cbo', 'web', '2025-06-27 04:19:01', '2025-06-27 04:19:01'),
(2, 'create_cbo', 'web', '2025-06-27 04:19:01', '2025-06-27 04:19:01'),
(3, 'update_cbo', 'web', '2025-06-27 04:19:01', '2025-06-27 04:19:01'),
(4, 'delete_cbo', 'web', '2025-06-27 04:19:01', '2025-06-27 04:19:01'),
(5, 'view_mhp', 'web', '2025-06-27 04:19:01', '2025-06-27 04:19:01'),
(6, 'create_mhp', 'web', '2025-06-27 04:19:01', '2025-06-27 04:19:01'),
(7, 'update_mhp', 'web', '2025-06-27 04:19:01', '2025-06-27 04:19:01'),
(8, 'delete_mhp', 'web', '2025-06-27 04:19:01', '2025-06-27 04:19:01'),
(9, 'view_procurement', 'web', '2025-06-27 04:19:01', '2025-06-27 04:19:01'),
(10, 'create_procurement', 'web', '2025-06-27 04:19:01', '2025-06-27 04:19:01'),
(11, 'update_procurement', 'web', '2025-06-27 04:19:01', '2025-06-27 04:19:01'),
(12, 'delete_procurement', 'web', '2025-06-27 04:19:01', '2025-06-27 04:19:01'),
(13, 'manage_users', 'web', '2025-06-27 04:19:01', '2025-06-27 04:19:01'),
(14, 'assign_roles', 'web', '2025-06-27 04:19:01', '2025-06-27 04:19:01');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `procurement_committee_members`
--

CREATE TABLE `procurement_committee_members` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `designation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `procurement_committee_reviews`
--

CREATE TABLE `procurement_committee_reviews` (
  `id` bigint UNSIGNED NOT NULL,
  `procurement_order_id` bigint UNSIGNED NOT NULL,
  `committee_member_id` bigint UNSIGNED DEFAULT NULL,
  `member_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `designation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `decision` enum('approve','reject','abstain') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'abstain',
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `procurement_deliveries`
--

CREATE TABLE `procurement_deliveries` (
  `id` bigint UNSIGNED NOT NULL,
  `procurement_order_id` bigint UNSIGNED NOT NULL,
  `delivery_date` date DEFAULT NULL,
  `delivery_notes` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `procurement_final_approvals`
--

CREATE TABLE `procurement_final_approvals` (
  `id` bigint UNSIGNED NOT NULL,
  `procurement_order_id` bigint UNSIGNED NOT NULL,
  `approved_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `designation` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `final_status` enum('approved','rejected','under_review') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'under_review',
  `decision_date` date DEFAULT NULL,
  `final_remarks` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `procurement_items`
--

CREATE TABLE `procurement_items` (
  `id` bigint UNSIGNED NOT NULL,
  `procurement_requisition_id` bigint UNSIGNED NOT NULL,
  `item_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantity` int NOT NULL,
  `specification` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `procurement_orders`
--

CREATE TABLE `procurement_orders` (
  `id` bigint UNSIGNED NOT NULL,
  `procurement_quotation_id` bigint UNSIGNED NOT NULL,
  `procurement_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `procurement_type` enum('MHP','Irrigation','Administrative') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Administrative',
  `order_date` date NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `total_amount` decimal(15,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `procurement_payments`
--

CREATE TABLE `procurement_payments` (
  `id` bigint UNSIGNED NOT NULL,
  `procurement_order_id` bigint UNSIGNED NOT NULL,
  `payment_date` date NOT NULL,
  `amount_paid` decimal(15,2) NOT NULL,
  `payment_method` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reference` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `procurement_quotations`
--

CREATE TABLE `procurement_quotations` (
  `id` bigint UNSIGNED NOT NULL,
  `procurement_requisition_id` bigint UNSIGNED NOT NULL,
  `vendor_id` bigint UNSIGNED NOT NULL,
  `quotation_date` date DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `procurement_requisitions`
--

CREATE TABLE `procurement_requisitions` (
  `id` bigint UNSIGNED NOT NULL,
  `reference_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `requested_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `requested_on` date NOT NULL,
  `purpose` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_cost_revisions`
--

CREATE TABLE `project_cost_revisions` (
  `id` bigint UNSIGNED NOT NULL,
  `approvable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `approvable_id` bigint UNSIGNED NOT NULL,
  `revision_number` int UNSIGNED NOT NULL,
  `revised_cost` decimal(15,2) NOT NULL,
  `approved_on` date DEFAULT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_financial_installments`
--

CREATE TABLE `project_financial_installments` (
  `id` bigint UNSIGNED NOT NULL,
  `projectable_id` bigint UNSIGNED NOT NULL,
  `projectable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'general',
  `installment_number` int UNSIGNED NOT NULL,
  `installment_date` date DEFAULT NULL,
  `installment_amount` decimal(15,2) NOT NULL,
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_physical_progresses`
--

CREATE TABLE `project_physical_progresses` (
  `id` bigint UNSIGNED NOT NULL,
  `projectable_id` bigint UNSIGNED NOT NULL,
  `projectable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `milestone_percent` int UNSIGNED NOT NULL,
  `component` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'general',
  `remarks` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `revenue_records`
--

CREATE TABLE `revenue_records` (
  `id` bigint UNSIGNED NOT NULL,
  `mhp_site_id` bigint UNSIGNED NOT NULL,
  `billing_month` date NOT NULL,
  `connection_charges` decimal(10,2) DEFAULT NULL,
  `billing_amount` decimal(10,2) DEFAULT NULL,
  `line_rent_amount` decimal(10,2) DEFAULT NULL,
  `late_payment_surcharge` decimal(10,2) DEFAULT NULL,
  `fine_additional_cost` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'root', 'web', '2025-06-27 04:00:21', '2025-06-27 04:00:21'),
(2, 'admin', 'web', '2025-06-27 04:00:21', '2025-06-27 04:00:21'),
(3, 'mhp', 'web', '2025-06-27 04:00:21', '2025-06-27 04:00:21'),
(4, 'irrigation', 'web', '2025-06-27 04:00:21', '2025-06-27 04:00:21'),
(5, 'mhp-irrigation', 'web', '2025-06-27 04:00:21', '2025-06-27 04:00:21'),
(6, 'cbo', 'web', '2025-06-27 04:00:21', '2025-06-27 04:00:21'),
(7, 'cbo-mhp-irrigation', 'web', '2025-06-27 04:00:21', '2025-06-27 04:00:21'),
(8, 'procurement', 'web', '2025-06-27 04:00:21', '2025-06-27 04:00:21'),
(9, 'kpo', 'web', '2025-06-27 04:00:21', '2025-06-27 04:00:21'),
(10, 'reporter', 'web', '2025-06-27 04:00:21', '2025-06-27 04:00:21');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint UNSIGNED NOT NULL,
  `role_id` bigint UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `role_has_permissions`
--

INSERT INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1),
(13, 1),
(14, 1),
(1, 2),
(2, 2),
(3, 2),
(4, 2),
(5, 2),
(6, 2),
(7, 2),
(8, 2),
(9, 2),
(10, 2),
(11, 2),
(12, 2),
(13, 2),
(14, 2),
(5, 3),
(6, 3),
(1, 6),
(2, 6),
(9, 8);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('c59hB1a032mL5JtRdOu32QXgd7ep2gGWqktLAv48', 3, '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoia0l4aVQxOXd5S2MzNERpcEFTQlhZSWlMOGJ1aFBKYVFVcXJ3Rk5BYSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDg6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9jYm8vZXhwb3N1cmUtdmlzaXRzLzIvZWRpdCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjM7fQ==', 1751113795),
('oZUJIyeFRf7vy7wCxWITvddc7eRkEn7KeZeXbM88', NULL, '127.0.0.1', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoialZRNjVMVzFQVFNYMmVYY1ZKMTRCaEg3N3VGQTdhN2UzZXhTV3BNRiI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czozMToiaHR0cDovL2xvY2FsaG9zdDo4MDAwL2Rhc2hib2FyZCI7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjI3OiJodHRwOi8vbG9jYWxob3N0OjgwMDAvbG9naW4iO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1751107422);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `two_factor_secret` text COLLATE utf8mb4_unicode_ci,
  `two_factor_recovery_codes` text COLLATE utf8mb4_unicode_ci,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `current_team_id` bigint UNSIGNED DEFAULT NULL,
  `profile_photo_path` varchar(2048) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `remember_token`, `current_team_id`, `profile_photo_path`, `created_at`, `updated_at`) VALUES
(1, 'Admin User', 'admin@example.com', NULL, '$2y$12$olT5vmZb3JjCUfP.NkbmV.1oDtTF32UvQZvnAamY1wmT/9eEUPbB2', NULL, NULL, NULL, NULL, NULL, NULL, '2025-06-27 04:19:01', '2025-06-27 04:19:01'),
(2, 'CBO Officer', 'cbo@example.com', NULL, '$2y$12$OW4WkYHUFyeviLmmNp1Kc.eEsjgxxkOy1VCs8dBT4pJZimPM9rOLy', NULL, NULL, NULL, NULL, NULL, NULL, '2025-06-27 04:19:02', '2025-06-27 04:19:02'),
(3, 'Root User', 'root@example.com', NULL, '$2y$12$D25nICkpU9naKZNZcadm3.sBTRg.k/.YgEOHA7Krv05UxPNF8/QZ2', NULL, NULL, NULL, NULL, NULL, NULL, '2025-06-27 04:19:02', '2025-06-27 04:19:02');

-- --------------------------------------------------------

--
-- Table structure for table `vendors`
--

CREATE TABLE `vendors` (
  `id` bigint UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contact_person` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attachments`
--
ALTER TABLE `attachments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `attachments_attachable_type_attachable_id_index` (`attachable_type`,`attachable_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cbos`
--
ALTER TABLE `cbos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cbos_reference_code_unique` (`reference_code`);

--
-- Indexes for table `cbo_dialogues`
--
ALTER TABLE `cbo_dialogues`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cbo_dialogues_cbo_id_foreign` (`cbo_id`);

--
-- Indexes for table `cbo_exposure_visits`
--
ALTER TABLE `cbo_exposure_visits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cbo_exposure_visits_cbo_id_foreign` (`cbo_id`);

--
-- Indexes for table `cbo_trainings`
--
ALTER TABLE `cbo_trainings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cbo_trainings_cbo_id_foreign` (`cbo_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `irrigation_admin_approvals`
--
ALTER TABLE `irrigation_admin_approvals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `irrigation_admin_approvals_irrigation_scheme_id_foreign` (`irrigation_scheme_id`);

--
-- Indexes for table `irrigation_completions`
--
ALTER TABLE `irrigation_completions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `irrigation_completions_irrigation_scheme_id_foreign` (`irrigation_scheme_id`);

--
-- Indexes for table `irrigation_schemes`
--
ALTER TABLE `irrigation_schemes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `irrigation_schemes_cbo_id_foreign` (`cbo_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `media_model_type_model_id_index` (`model_type`,`model_id`);

--
-- Indexes for table `mhp_admin_approvals`
--
ALTER TABLE `mhp_admin_approvals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mhp_admin_approvals_mhp_site_id_foreign` (`mhp_site_id`);

--
-- Indexes for table `mhp_completions`
--
ALTER TABLE `mhp_completions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mhp_completions_mhp_site_id_foreign` (`mhp_site_id`);

--
-- Indexes for table `mhp_eme_progress`
--
ALTER TABLE `mhp_eme_progress`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mhp_eme_progress_mhp_site_id_foreign` (`mhp_site_id`);

--
-- Indexes for table `mhp_sites`
--
ALTER TABLE `mhp_sites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mhp_sites_cbo_id_foreign` (`cbo_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `om_costs`
--
ALTER TABLE `om_costs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `om_costs_mhp_site_id_foreign` (`mhp_site_id`);

--
-- Indexes for table `operational_costs`
--
ALTER TABLE `operational_costs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `operational_costs_mhp_site_id_foreign` (`mhp_site_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `procurement_committee_members`
--
ALTER TABLE `procurement_committee_members`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `procurement_committee_reviews`
--
ALTER TABLE `procurement_committee_reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `procurement_committee_reviews_procurement_order_id_foreign` (`procurement_order_id`),
  ADD KEY `procurement_committee_reviews_committee_member_id_foreign` (`committee_member_id`);

--
-- Indexes for table `procurement_deliveries`
--
ALTER TABLE `procurement_deliveries`
  ADD PRIMARY KEY (`id`),
  ADD KEY `procurement_deliveries_procurement_order_id_foreign` (`procurement_order_id`);

--
-- Indexes for table `procurement_final_approvals`
--
ALTER TABLE `procurement_final_approvals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `procurement_final_approvals_procurement_order_id_foreign` (`procurement_order_id`);

--
-- Indexes for table `procurement_items`
--
ALTER TABLE `procurement_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `procurement_items_procurement_requisition_id_foreign` (`procurement_requisition_id`);

--
-- Indexes for table `procurement_orders`
--
ALTER TABLE `procurement_orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `procurement_orders_procurement_code_unique` (`procurement_code`),
  ADD KEY `procurement_orders_procurement_quotation_id_foreign` (`procurement_quotation_id`);

--
-- Indexes for table `procurement_payments`
--
ALTER TABLE `procurement_payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `procurement_payments_procurement_order_id_foreign` (`procurement_order_id`);

--
-- Indexes for table `procurement_quotations`
--
ALTER TABLE `procurement_quotations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `procurement_quotations_procurement_requisition_id_foreign` (`procurement_requisition_id`),
  ADD KEY `procurement_quotations_vendor_id_foreign` (`vendor_id`);

--
-- Indexes for table `procurement_requisitions`
--
ALTER TABLE `procurement_requisitions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `project_cost_revisions`
--
ALTER TABLE `project_cost_revisions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_cost_revisions_approvable_type_approvable_id_index` (`approvable_type`,`approvable_id`);

--
-- Indexes for table `project_financial_installments`
--
ALTER TABLE `project_financial_installments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projectable_index` (`projectable_type`,`projectable_id`);

--
-- Indexes for table `project_physical_progresses`
--
ALTER TABLE `project_physical_progresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projectable_index` (`projectable_type`,`projectable_id`);

--
-- Indexes for table `revenue_records`
--
ALTER TABLE `revenue_records`
  ADD PRIMARY KEY (`id`),
  ADD KEY `revenue_records_mhp_site_id_foreign` (`mhp_site_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `vendors`
--
ALTER TABLE `vendors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attachments`
--
ALTER TABLE `attachments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cbos`
--
ALTER TABLE `cbos`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cbo_dialogues`
--
ALTER TABLE `cbo_dialogues`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `cbo_exposure_visits`
--
ALTER TABLE `cbo_exposure_visits`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `cbo_trainings`
--
ALTER TABLE `cbo_trainings`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `irrigation_admin_approvals`
--
ALTER TABLE `irrigation_admin_approvals`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `irrigation_completions`
--
ALTER TABLE `irrigation_completions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `irrigation_schemes`
--
ALTER TABLE `irrigation_schemes`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `mhp_admin_approvals`
--
ALTER TABLE `mhp_admin_approvals`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mhp_completions`
--
ALTER TABLE `mhp_completions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mhp_eme_progress`
--
ALTER TABLE `mhp_eme_progress`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mhp_sites`
--
ALTER TABLE `mhp_sites`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `om_costs`
--
ALTER TABLE `om_costs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `operational_costs`
--
ALTER TABLE `operational_costs`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `procurement_committee_members`
--
ALTER TABLE `procurement_committee_members`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `procurement_committee_reviews`
--
ALTER TABLE `procurement_committee_reviews`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `procurement_deliveries`
--
ALTER TABLE `procurement_deliveries`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `procurement_final_approvals`
--
ALTER TABLE `procurement_final_approvals`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `procurement_items`
--
ALTER TABLE `procurement_items`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `procurement_orders`
--
ALTER TABLE `procurement_orders`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `procurement_payments`
--
ALTER TABLE `procurement_payments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `procurement_quotations`
--
ALTER TABLE `procurement_quotations`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `procurement_requisitions`
--
ALTER TABLE `procurement_requisitions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_cost_revisions`
--
ALTER TABLE `project_cost_revisions`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_financial_installments`
--
ALTER TABLE `project_financial_installments`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_physical_progresses`
--
ALTER TABLE `project_physical_progresses`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `revenue_records`
--
ALTER TABLE `revenue_records`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `vendors`
--
ALTER TABLE `vendors`
  MODIFY `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cbo_dialogues`
--
ALTER TABLE `cbo_dialogues`
  ADD CONSTRAINT `cbo_dialogues_cbo_id_foreign` FOREIGN KEY (`cbo_id`) REFERENCES `cbos` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cbo_exposure_visits`
--
ALTER TABLE `cbo_exposure_visits`
  ADD CONSTRAINT `cbo_exposure_visits_cbo_id_foreign` FOREIGN KEY (`cbo_id`) REFERENCES `cbos` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `cbo_trainings`
--
ALTER TABLE `cbo_trainings`
  ADD CONSTRAINT `cbo_trainings_cbo_id_foreign` FOREIGN KEY (`cbo_id`) REFERENCES `cbos` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `irrigation_admin_approvals`
--
ALTER TABLE `irrigation_admin_approvals`
  ADD CONSTRAINT `irrigation_admin_approvals_irrigation_scheme_id_foreign` FOREIGN KEY (`irrigation_scheme_id`) REFERENCES `irrigation_schemes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `irrigation_completions`
--
ALTER TABLE `irrigation_completions`
  ADD CONSTRAINT `irrigation_completions_irrigation_scheme_id_foreign` FOREIGN KEY (`irrigation_scheme_id`) REFERENCES `irrigation_schemes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `irrigation_schemes`
--
ALTER TABLE `irrigation_schemes`
  ADD CONSTRAINT `irrigation_schemes_cbo_id_foreign` FOREIGN KEY (`cbo_id`) REFERENCES `cbos` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `mhp_admin_approvals`
--
ALTER TABLE `mhp_admin_approvals`
  ADD CONSTRAINT `mhp_admin_approvals_mhp_site_id_foreign` FOREIGN KEY (`mhp_site_id`) REFERENCES `mhp_sites` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `mhp_completions`
--
ALTER TABLE `mhp_completions`
  ADD CONSTRAINT `mhp_completions_mhp_site_id_foreign` FOREIGN KEY (`mhp_site_id`) REFERENCES `mhp_sites` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `mhp_eme_progress`
--
ALTER TABLE `mhp_eme_progress`
  ADD CONSTRAINT `mhp_eme_progress_mhp_site_id_foreign` FOREIGN KEY (`mhp_site_id`) REFERENCES `mhp_sites` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `mhp_sites`
--
ALTER TABLE `mhp_sites`
  ADD CONSTRAINT `mhp_sites_cbo_id_foreign` FOREIGN KEY (`cbo_id`) REFERENCES `cbos` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `om_costs`
--
ALTER TABLE `om_costs`
  ADD CONSTRAINT `om_costs_mhp_site_id_foreign` FOREIGN KEY (`mhp_site_id`) REFERENCES `mhp_sites` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `operational_costs`
--
ALTER TABLE `operational_costs`
  ADD CONSTRAINT `operational_costs_mhp_site_id_foreign2` FOREIGN KEY (`mhp_site_id`) REFERENCES `mhp_sites` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `procurement_committee_reviews`
--
ALTER TABLE `procurement_committee_reviews`
  ADD CONSTRAINT `procurement_committee_reviews_committee_member_id_foreign` FOREIGN KEY (`committee_member_id`) REFERENCES `procurement_committee_members` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `procurement_committee_reviews_procurement_order_id_foreign` FOREIGN KEY (`procurement_order_id`) REFERENCES `procurement_orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `procurement_deliveries`
--
ALTER TABLE `procurement_deliveries`
  ADD CONSTRAINT `procurement_deliveries_procurement_order_id_foreign` FOREIGN KEY (`procurement_order_id`) REFERENCES `procurement_orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `procurement_final_approvals`
--
ALTER TABLE `procurement_final_approvals`
  ADD CONSTRAINT `procurement_final_approvals_procurement_order_id_foreign` FOREIGN KEY (`procurement_order_id`) REFERENCES `procurement_orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `procurement_items`
--
ALTER TABLE `procurement_items`
  ADD CONSTRAINT `procurement_items_procurement_requisition_id_foreign` FOREIGN KEY (`procurement_requisition_id`) REFERENCES `procurement_requisitions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `procurement_orders`
--
ALTER TABLE `procurement_orders`
  ADD CONSTRAINT `procurement_orders_procurement_quotation_id_foreign` FOREIGN KEY (`procurement_quotation_id`) REFERENCES `procurement_quotations` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `procurement_payments`
--
ALTER TABLE `procurement_payments`
  ADD CONSTRAINT `procurement_payments_procurement_order_id_foreign` FOREIGN KEY (`procurement_order_id`) REFERENCES `procurement_orders` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `procurement_quotations`
--
ALTER TABLE `procurement_quotations`
  ADD CONSTRAINT `procurement_quotations_procurement_requisition_id_foreign` FOREIGN KEY (`procurement_requisition_id`) REFERENCES `procurement_requisitions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `procurement_quotations_vendor_id_foreign` FOREIGN KEY (`vendor_id`) REFERENCES `vendors` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `revenue_records`
--
ALTER TABLE `revenue_records`
  ADD CONSTRAINT `revenue_records_mhp_site_id_foreign` FOREIGN KEY (`mhp_site_id`) REFERENCES `mhp_sites` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
