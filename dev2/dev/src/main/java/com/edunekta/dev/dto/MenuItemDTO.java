package com.edunekta.dev.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * DTO para representar un elemento del menú de navegación.
 */
@Data
@AllArgsConstructor
public class MenuItemDTO {
    private String name;
    private String url;
    private String icon;
}