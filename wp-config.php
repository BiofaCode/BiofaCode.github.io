<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}


define('AUTH_KEY',         'g4vdkJhYYAZHY/uH90E1zlQVuy8SMC7UW3xLHM25P7Rk6kLzTSxTDvUFhLOFT6XF1YADPpU5rwpjnSH+59NLEA==');
define('SECURE_AUTH_KEY',  '1SNCGEBmHWdyvE+fEQ4o8IvkA4FCS9RdjDF/hIVbfGHOzQ/EK55becQVfSpmV1CkEiNWZHCEQOFnAKfmHle2nQ==');
define('LOGGED_IN_KEY',    '7f558AXMV67f/Gh52sEYtHROcI+FJHcZGogFC8xE4BSeOyiv0Erz2KgCZ5RWNxSIy8zi/v827YhlQX3CR8Vy3g==');
define('NONCE_KEY',        '1qG+BH+2wKVDqlLmP1Vl8LJlgTXRA48WUIOG4IlR4BkBWfrQZLhcY+mU6sbKxo4yE2bSLfR5O35Rvyem7Eyl7g==');
define('AUTH_SALT',        'ffeeLZLLBRQxwiv7U7ip+S7CfOlaNn642SGHic+n8if1dsLfFOwrsED8lejdnsRT+Y36Nw0xBcTuuSBUc21dTw==');
define('SECURE_AUTH_SALT', 'qJvF5S0NfC/Re8ibQlQWOOgckK/+aHGWvzsT+wPn2JBSVUhxbOmjnZqcVxJZZ9PPc0QDavvwoIZfVz4S1LxCkQ==');
define('LOGGED_IN_SALT',   'x2m80e5sGYtF0G59Aa+bQPj4MK+rSbVu7lM0oy9Kd2bByq/z5vjlLnHsSKZ66vqeJnzaw+VAJYR7dJzvUb5qlA==');
define('NONCE_SALT',       'jcFTHqqiGGfcChiB0d7PTzbNyX1IhvrUvbkYEh/u8sd80IHz2KhqFh+G0uBEJKhdaM8kSpcVPymFZwoWqlG6iA==');
define( 'WP_ENVIRONMENT_TYPE', 'local' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
