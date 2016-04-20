<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpress');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', 'root');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'rq8-oppZG-,LF8H5ssx&>Tj[q zEY{}E cl|FHz.Q8>1l|E.h7UIff.3kFh=ppc[');
define('SECURE_AUTH_KEY',  'guJ+ :_M5_~qxUS =wkXgG;).b1~0Y=!KiV-Z/(7BLQc- -qJFGpU9pvSjPOEx]-');
define('LOGGED_IN_KEY',    'C:AQII:F-S3]eSro;#-%6V_Ko|RG<1%?D3KM^|O]P1`<v@IyIk=NEiiu8ow|.}-)');
define('NONCE_KEY',        '9|Eh(O|+o6wdn,`yks)ezDc>eck4+f#PDS=0Fo{Y&>_&U8s`(|n&MjLPxA@c#--@');
define('AUTH_SALT',        '2*cKs*9s?ZiYx4BWr27=$6BxgG`bO-1v]Xu=kCTCbR~hkJOC9GHPKhH5[x!uyp*l');
define('SECURE_AUTH_SALT', '^v1pA9=XAvQw[7P_yG.k|?O#3JxUWBpL2uz?<TNA14s@T_aX26Yq>;55UTcdRAT)');
define('LOGGED_IN_SALT',   '.=:o `p; D-D5N1ODQ%#fkNu~q@gTb]%dGG0`o|4,1iO|D`n;72,!=1u-YM^hGR*');
define('NONCE_SALT',       '+A<v`XatF-xkk|B9r]UpdMf+!8HqD.:K1E9*GV0zx+S-@8?&;+1HVF|A#M<g}pGq');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
