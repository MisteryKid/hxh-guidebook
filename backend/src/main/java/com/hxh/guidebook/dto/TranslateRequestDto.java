package com.hxh.guidebook.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TranslateRequestDto {
    private String text;
    private String mode; // "EN_TO_HUNTER", "HUNTER_TO_EN", "KO_TO_HUNTER" 등
}
