package com.hxh.guidebook.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TranslateResponseDto {
    private String originalText;
    private String translatedText;
    private String mode;
}
