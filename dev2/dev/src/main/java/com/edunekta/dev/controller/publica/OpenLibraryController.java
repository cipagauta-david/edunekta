package com.edunekta.dev.controller.publica;

import com.edunekta.dev.service.publica.OpenLibraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Controller
public class OpenLibraryController {
    @Autowired
    private OpenLibraryService openLibraryService;

    @GetMapping("/publica/busqueda")
    public String busqueda(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String author,
            @RequestParam(required = false) String sort,
            @RequestParam(required = false) Integer page,
            Model model) {
        model.addAttribute("q", q);
        model.addAttribute("title", title);
        model.addAttribute("author", author);
        model.addAttribute("sort", sort);
        model.addAttribute("page", page);

        String result = null;
        String errorMsg = null;
        if (q != null && !q.isEmpty()) {
            result = openLibraryService.searchByQuery(q, sort, page);
        } else if (title != null && !title.isEmpty()) {
            result = openLibraryService.searchByTitle(title, sort, page);
        } else if (author != null && !author.isEmpty()) {
            result = openLibraryService.searchByAuthor(author, sort, page);
        }
        java.util.List<java.util.Map<String, Object>> docsList = null;
        int numFound = 0;
        int start = 0;
        try {
            if (result != null) {
                // Validar si la respuesta es JSON
                if (result.trim().startsWith("{") || result.trim().startsWith("[")) {
                    ObjectMapper mapper = new ObjectMapper();
                    JsonNode root = mapper.readTree(result);
                    JsonNode docs = root.path("docs");
                    numFound = root.path("numFound").asInt();
                    start = root.path("start").asInt();
                    if (docs.isArray()) {
                        docsList = new java.util.ArrayList<>();
                        for (JsonNode doc : docs) {
                            java.util.Map<String, Object> map = new java.util.HashMap<>();
                            map.put("title", doc.path("title").asText("-"));
                            // author_name puede ser array
                            if (doc.has("author_name")) {
                                java.util.List<String> authors = new java.util.ArrayList<>();
                                for (JsonNode a : doc.get("author_name")) {
                                    authors.add(a.asText());
                                }
                                map.put("author_name", authors);
                            } else {
                                map.put("author_name", java.util.Collections.emptyList());
                            }
                            map.put("first_publish_year",
                                    doc.has("first_publish_year") ? doc.get("first_publish_year").asText("") : "");
                            // language puede ser array
                            if (doc.has("language")) {
                                java.util.List<String> langs = new java.util.ArrayList<>();
                                for (JsonNode l : doc.get("language")) {
                                    langs.add(l.asText());
                                }
                                map.put("language", langs);
                            } else {
                                map.put("language", java.util.Collections.emptyList());
                            }
                            docsList.add(map);
                        }
                    }
                } else {
                    errorMsg = "La respuesta de OpenLibrary no es válida o el servicio no está disponible. Intenta más tarde.";
                }
            }
        } catch (Exception e) {
            errorMsg = "Ocurrió un error procesando la respuesta de OpenLibrary.";
        }
        model.addAttribute("docs", docsList);
        model.addAttribute("numFound", numFound);
        model.addAttribute("start", start);
        model.addAttribute("result", result); // por si se quiere mostrar el JSON crudo
        model.addAttribute("errorMsg", errorMsg);
        return "publica/busqueda";
    }
}
