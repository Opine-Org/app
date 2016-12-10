<?php
class ValdidationHelper {
    public static function flattenErrors (array $errors) : array
    {
        $out = [];
        foreach ($errors as $field => $messages) {
            foreach ($messages as $message) {
                $out[] = $message;
            }
        }
        return $out;
    }
}
