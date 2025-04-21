<?php

    namespace App;

    class ConfigDB {
        private static $instance = null;
        private static $config = [
            'host' => 'localhost',
            'dbname' => 'bdd_femme-enceinte',
            'username' => 'root',
            'password' => ''
        ];
        private function __construct() {

        }

        public static function getInstance() {
            if (!self::$instance) {
                self::$instance = new ConfigDB();
            }
            return self::$instance;
        }
        public function getConfig() {
            return self::$config;
        }
    }
?>