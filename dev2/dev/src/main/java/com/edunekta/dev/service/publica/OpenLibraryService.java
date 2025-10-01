package com.edunekta.dev.service.publica;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class OpenLibraryService {
  private final RestTemplate restTemplate = new RestTemplate();
  private static final String BASE_URL = "https://openlibrary.org/search.json";

  public String searchByQuery(String query, String sort, Integer page) {
  UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(BASE_URL)
    .queryParam("q", query);
  builder = addSortAndPageParams(builder, sort, page);
  java.net.URI uri = builder.encode().build().toUri();
  ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
    return response.getStatusCode() == HttpStatus.OK ? response.getBody() : null;
  }

  public String searchByTitle(String title, String sort, Integer page) {
  UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(BASE_URL)
    .queryParam("title", title);
  builder = addSortAndPageParams(builder, sort, page);
  java.net.URI uri = builder.encode().build().toUri();
  ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
    return response.getStatusCode() == HttpStatus.OK ? response.getBody() : null;
  }

  public String searchByAuthor(String author, String sort, Integer page) {
  UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(BASE_URL)
    .queryParam("author", author);
  builder = addSortAndPageParams(builder, sort, page);
  java.net.URI uri = builder.encode().build().toUri();
  ResponseEntity<String> response = restTemplate.getForEntity(uri, String.class);
    return response.getStatusCode() == HttpStatus.OK ? response.getBody() : null;
  }

  private UriComponentsBuilder addSortAndPageParams(UriComponentsBuilder builder, String sort, Integer page) {
    if (sort != null) {
      builder.queryParam("sort", sort);
    }
    if (page != null) {
      builder.queryParam("page", page);
    }
    return builder;
  }
}
