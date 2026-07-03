package com.hxh.guidebook.service;

import com.hxh.guidebook.dto.TranslateRequestDto;
import com.hxh.guidebook.dto.TranslateResponseDto;
import org.springframework.stereotype.Service;

@Service
public class TranslatorService {

    // 한글 유니코드 분석용 상수
    private static final int HANGUL_BEGIN_UNICODE = 44032; // '가'
    private static final int HANGUL_LAST_UNICODE = 55203; // '힣'
    private static final int HANGUL_BASE = 588;

    // 초성 19개
    private static final String[] CHOSUNG = {
        "g", "kk", "n", "d", "tt", "r", "m", "b", "pp",
        "s", "ss", "", "j", "jj", "ch", "k", "t", "p", "h"
    };

    // 중성 21개
    private static final String[] JOUNGSUNG = {
        "a", "ae", "ya", "yae", "eo", "e", "yeo", "ye", "o", "wa",
        "wae", "oe", "yo", "u", "wo", "we", "wi", "yu", "eu", "ui", "i"
    };

    // 종성 28개 (0번은 종성 없음)
    private static final String[] JONGSUNG = {
        "", "g", "ss", "gs", "n", "nj", "nh", "d", "l", "lg", "lm", "lb",
        "ls", "lt", "lp", "lh", "m", "b", "bs", "s", "ss", "ng", "j", "ch",
        "k", "t", "p", "h"
    };

    public TranslateResponseDto translate(TranslateRequestDto request) {
        String originalText = request.getText();
        String mode = request.getMode();
        String translatedText = "";

        if (originalText == null) {
            originalText = "";
        }

        if ("KO_TO_HUNTER".equalsIgnoreCase(mode)) {
            // 한국어를 로마자(영어)로 발음 변환 -> 프론트에서 헌터 폰트를 씌우면 헌터어로 렌더링됨
            translatedText = convertKoreanToRoman(originalText).toUpperCase();
        } else if ("EN_TO_HUNTER".equalsIgnoreCase(mode)) {
            // 영어는 헌터어와 1:1 매핑되므로 그대로 대문자로 변환하여 전송 (폰트는 프론트엔드에서 씌움)
            translatedText = originalText.toUpperCase();
        } else {
            // 기본값은 입력 텍스트 그대로 유지
            translatedText = originalText;
        }

        return TranslateResponseDto.builder()
                .originalText(originalText)
                .translatedText(translatedText)
                .mode(mode)
                .build();
    }

    /**
     * 한글 단어를 간단한 로마자 표기로 분해하여 영문 발음으로 매핑해주는 유틸 메서드
     */
    private String convertKoreanToRoman(String text) {
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < text.length(); i++) {
            char ch = text.charAt(i);

            // 한글 범위 내에 있는 문자인지 판별
            if (ch >= HANGUL_BEGIN_UNICODE && ch <= HANGUL_LAST_UNICODE) {
                int unicodeVal = ch - HANGUL_BEGIN_UNICODE;
                
                int chosungIdx = unicodeVal / HANGUL_BASE;
                int jungsungIdx = (unicodeVal % HANGUL_BASE) / 28;
                int jongsungIdx = unicodeVal % 28;

                sb.append(CHOSUNG[chosungIdx]);
                sb.append(JOUNGSUNG[jungsungIdx]);
                sb.append(JONGSUNG[jongsungIdx]);
            } else {
                // 한글이 아니면 그대로 유지 (영어, 숫자, 공백, 특수문자 등)
                sb.append(ch);
            }
        }

        return sb.toString();
    }
}
