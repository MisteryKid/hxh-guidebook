package com.hxh.guidebook.controller;

import com.hxh.guidebook.dto.TranslateRequestDto;
import com.hxh.guidebook.dto.TranslateResponseDto;
import com.hxh.guidebook.service.TranslatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/translator")
@RequiredArgsConstructor
public class TranslatorController {

    private final TranslatorService translatorService;

    @PostMapping("/translate")
    public ResponseEntity<TranslateResponseDto> translate(@RequestBody TranslateRequestDto request) {
        TranslateResponseDto response = translatorService.translate(request);
        return ResponseEntity.ok(response);
    }
}
