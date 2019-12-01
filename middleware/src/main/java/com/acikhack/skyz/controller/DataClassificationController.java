package com.acikhack.skyz.controller;

import com.acikhack.skyz.classifiers.NaiveBayes;
import com.acikhack.skyz.dataobjects.NaiveBayesKnowledgeBase;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.Map;

/**
 * ekocbiyik on 01.12.2019
 */
@RequestMapping(value = "/api")
@RestController
public class DataClassificationController {

    private static Map<String, String[]> trainingDataset = new HashMap<>();
    private static NaiveBayes naiveBayesAL = new NaiveBayes();

    public DataClassificationController() throws IOException {

        Map<String, String> trainingFiles = new HashMap<>();
        trainingFiles.put("Ekonomi", "classpath:ekonomi_dataset.txt");
        trainingFiles.put("Politika", "classpath:politika_dataset.txt");
        trainingFiles.put("Sanat", "classpath:sanat_dataset.txt");
        trainingFiles.put("Spor", "classpath:spor_dataset.txt");
        trainingFiles.put("Teknoloji", "classpath:teknoloji_dataset.txt");

        for (Map.Entry<String, String> entry : trainingFiles.entrySet()) {
            trainingDataset.put(entry.getKey(), readLines(entry.getValue()));
        }

        naiveBayesAL.setChisquareCriticalValue(6.61);
        naiveBayesAL.train(trainingDataset);
    }

    public String[] readLines(String url) throws IOException {
        return Files.lines(ResourceUtils.getFile(url).toPath())
                .map(String::toLowerCase)
                .toArray(String[]::new);
    }

    @RequestMapping(value = "/classify", method = RequestMethod.POST)
    public Map classifyText(@RequestBody Map json) {
        Map map = new HashMap();
        map.put("content", new NaiveBayes(naiveBayesAL.getKnowledgeBase()).predict((String) json.get("body")));
        return map;
    }

    @RequestMapping(value = "/addContent", method = RequestMethod.POST)
    public Map addContent(@RequestBody Map json) {

        String content = (String) json.get("content");
        String body = (String) json.get("body");
        String[] bodyLines = body.replaceAll("\"", "").replaceAll(".", "").toLowerCase().split("\n");
        String[] joined = ArrayUtils.addAll(bodyLines);

        if (trainingDataset.containsKey(content)) {
            String[] lines = trainingDataset.get(content);
            joined = ArrayUtils.addAll(lines, joined);
        }
        trainingDataset.put(content, joined);
        naiveBayesAL.train(trainingDataset);

        Map map = new HashMap();
        map.put("content", new NaiveBayes(naiveBayesAL.getKnowledgeBase()).predict(body));
        return map;
    }

}
