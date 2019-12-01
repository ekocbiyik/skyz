package com.acikhack.skyz.controller;

import com.acikhack.skyz.classifiers.NaiveBayes;
import com.acikhack.skyz.dataobjects.NaiveBayesKnowledgeBase;
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

    private static NaiveBayes classifyData;
    private static Map<String, String> trainingFiles = new HashMap<>();

    public DataClassificationController() throws IOException {

        trainingFiles.put("Ekonomi", "classpath:ekonomi_dataset.txt");
        trainingFiles.put("Politika", "classpath:politika_dataset.txt");
        trainingFiles.put("Sanat", "classpath:sanat_dataset.txt");
        trainingFiles.put("Spor", "classpath:spor_dataset.txt");
        trainingFiles.put("Teknoloji", "classpath:teknoloji_dataset.txt");

        //loading examples in memory
        Map<String, String[]> trainingExamples = new HashMap<>();
        for (Map.Entry<String, String> entry : trainingFiles.entrySet()) {
            trainingExamples.put(entry.getKey(), readLines(entry.getValue()));
        }

        NaiveBayes nb = new NaiveBayes();
        nb.setChisquareCriticalValue(6.63);
        nb.train(trainingExamples);

        NaiveBayesKnowledgeBase knowledgeBase = nb.getKnowledgeBase();

        //Use classifier
        classifyData = new NaiveBayes(knowledgeBase);
    }

    public String[] readLines(String url) throws IOException {
        return Files.lines(ResourceUtils.getFile(url).toPath())
                .map(String::toLowerCase)
                .toArray(String[]::new);
    }

    @RequestMapping(value = "/classify", method = RequestMethod.POST)
    public Map classifyText(@RequestBody Map body) {
        Map map = new HashMap();
        map.put("content", classifyData.predict((String) body.get("body")));
        return map;
    }

    @RequestMapping(value = "/addContent", method = RequestMethod.POST)
    public Map addContent(@RequestBody Map body) {
        // TODO: 12/1/19 to be implemented..
        return new HashMap();
    }

}
