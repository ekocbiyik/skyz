#Türkçe metinlerin sınıflandırılması.
​
## skyz
### Kullandığımız Teknolojiler   
Django - https://github.com/django/django  
Spring Boot - https://github.com/spring-projects/spring-boot  
React - https://github.com/reactjs    
ElasticSearch - https://github.com/elastic/elasticsearch  
Bayes Algoritması - https://github.com/datumbox/datumbox-framework  
Google API - https://developers.google.com/gmail/api/quickstart/python  
Docker - https://github.com/docker  

----------------------------------------------------------------
Açık hack 2019 kapsamında geliştirilen bu uygulama girilen bir 
türkçe metnin sınıflandırmasını yaparak ekonomi, politika, sanat,
spor ve teknoloji konu başlıklarından hangisine ait olduğunu bulabilmektedir.
Ayrıca bir gmail hesabına bağlanarak maillerinin içeriklerine göre 
sınıflandırmasını yapabilmektedir. 
​
Sınıflandırma işlemini ElasticSearch ve Bayes Algoritmasıyla farklı platformlarda 
ayrı ayrı gerçekleştirilerek sonuçlar karşılaştırıldı. 
ElasticSearch sonuçlarının doğruluk oranı yüksek, fakat daha yavaş,
Bayes algoritmasının ise doğruluk oranı daha düşük fakat daha hızlı olduğu görüldü.

#### Django custom commands 

Database üzerindeki test datasetini bayes algoritması ile test etmek için custom command.

    python manage.py test_ai_bayes

Sonuç %79.6 başarı oranı.


Database üzerindeki test datasetini elasticsearch ile test etmek için custom command.

    python manage.py test_ai_elastic

Sonuç %92 başarı oranı
​
##ELASTIC SEARCH
​
Çoğu makine öğrenmesi algoritması, verilerin vektör uzay modeli temsilini gerektirir. Özellik alanı genellikle belirli bir veri kümesinin 10.000 en önemli kelimesi gibi bir ifade barındırmaktadır. 
Peki bir kelimenin önemi nasıl ölçülebilir?
Genellikle TF-IDF ile yapılmaktadır. Bu, geçen yüzyılın 70'lerinde icat edilmiş bir formüldür. TF-IDF, belirli bir belgedeki bir terimi veri setinin geri kalanına göre puanlayan bir ağırlıktır. Bir belgedeki bir terimin yüksek bir TF-IDF puanı varsa, bu çok karakteristik bir anahtar kelime olduğu anlamına gelir ve bir dokümanı bu sözcükle diğer tüm dokümanlardan ayırmaktadır.
Bir belge alt kümesinde en yüksek TF-IDF puanına sahip anahtar kelimeler bir konuyu temsil edebilirler. Metin sınıflandırma için, genel olarak en yüksek TF-IDF puanlarına sahip n kadar kelimeli bir özellik alanı oldukça yaygındır.
Her belge bir özellik vektörüne dönüştürülür, ardından her sınıf / kategori için tüm eğitim örnekleri ile bir model oluşturulur. Bundan sonra bu modele göre yeni belgeler sınıflandırılabilmektedir. Bu nedenle, belgenin bir özellik vektörüne dönüştürülmesi gerekir ve oradan tüm benzerlikler hesaplanır. Belge, en yüksek puana sahip kategoriyle etiketlenecektir.
Elasticsearch ile Metin Sınıflandırması
Yukarıdakilerin tümü Elasticsearch (veya Lucene) ile çok daha kolay bir şekilde çözülebilir.
Sadece 3 adımı uygulamak gerekmektedir:  
1.Eşlemenizi yapılandırın ("içerik": "metin", "kategori": "anahtar kelime")  
2.Belgelerinizi indeksleyin  
3.Aşağıdaki gibi bir sorgu çalıştırın (MLT Query)    

​
PUT sample   
    
    {
      "properties":{
         "content":{
            "type":"text",
            "analyzer":"turkish"
         },
         "category":{
            "type":"text",
            "analyzer":"turkish",
            "fields":{
               "raw":{
                  "type":"keyword"
               }
            }
         }
      }
    }
      
​POST document/_mapping
  
      POST document/_doc/1
      {
        "category":"Kategori_1",
        "content":"İçerik_1(Veri Setiniz)"
      }
      POST sample/_doc/2
      {
        "category":"Kategori_2",
        "content":"İçerik_2(Veri Setiniz"
      }
      
MLT sorgusu, metin madenciliği için çok önemli bir sorundur.
Peki nasıl çalışmaktadır? İsteğe bağlı metni işleyebilmektedir, gerçek "modele" göre en üstteki anahtar kelimeleri ayıklayabilmektedir ve bu anahtar kelimelerle bir boolean eşleme sorgusu çalıştırabilmektedir. Bu sorgu genellikle benzer belgeleri toplamak için kullanılmaktadır.
Tüm belgelerin bir sınıf / kategori etiketi ve sınıf başına benzer sayıda eğitim örneği var ise, bu sınıflandırmaya eşdeğer olmaktadır. Sadece giriş belgesi ile benzer alan olarak bir MLT sorgusu çalıştırılabilmektedir.  
​

    POST document/_search
      {
      "query": {
        "more_like_this": {
          "fields": [
            "content"
          ],
          "like": [
            "Sınıflandırılacak İçerik"
          ],
          "min_term_freq": 1,
          "min_doc_freq": 1
        }
      }
}
​
Sonuç ['hits']['hits'] altında dönecektir.
Elasticsearch ayrıca Docker imajı olarak da mevcuttur. Görüntüler temel imaj olarak centos: 7 kullanmaktadır.
Yayınlanan tüm Docker imajlarının ve etiketlerinin bir listesi www.docker.elastic.com adresinde bulunabilmektedir. Kaynak dosyalar Github'dadır.
Bu imajları Elasticsearch lisansı altında kullanmak serbesttir. Açık kaynaklı ve ücretsiz ticari özellikler ve ücretli ticari özelliklere erişim içermektedirler. Ücretli tüm ticari özellikleri denemek için 30 günlük bir deneme sürümü başlatılabilir. Elasticsearch lisans seviyeleri hakkında bilgi için Abonelikler sayfasına bakılabilir.
Imageedit çekerek
Docker için Elasticsearch'ü edinmek, Elastic Docker kayıt defterine bir docker pull komutu vermek kadar basittir.
  
>>docker pull docker.elastic.co/elasticsearch/elasticsearch:7.4.2
 
>>docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.4.2

docker-compose.yml 

    version: '2.2'
    services:
      es01:
        image: docker.elastic.co/elasticsearch/elasticsearch:7.4.2
        container_name: es01
        environment:
          - node.name=es01
          - cluster.name=es-docker-cluster
          - discovery.seed_hosts=es02,es03
          - cluster.initial_master_nodes=es01,es02,es03
          - bootstrap.memory_lock=true
          - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
        ulimits:
          memlock:
            soft: -1
            hard: -1
        volumes:
          - data01:/usr/share/elasticsearch/data
        ports:
          - 9200:9200
        networks:
          - elastic
      es02:
        image: docker.elastic.co/elasticsearch/elasticsearch:7.4.2
        container_name: es02
        environment:
          - node.name=es02
          - cluster.name=es-docker-cluster
          - discovery.seed_hosts=es01,es03
          - cluster.initial_master_nodes=es01,es02,es03
          - bootstrap.memory_lock=true
          - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
        ulimits:
          memlock:
            soft: -1
            hard: -1
        volumes:
          - data02:/usr/share/elasticsearch/data
        networks:
          - elastic
      es03:
        image: docker.elastic.co/elasticsearch/elasticsearch:7.4.2
        container_name: es03
        environment:
          - node.name=es03
          - cluster.name=es-docker-cluster
          - discovery.seed_hosts=es01,es02
          - cluster.initial_master_nodes=es01,es02,es03
          - bootstrap.memory_lock=true
          - "ES_JAVA_OPTS=-Xms512m -Xmx512m"
        ulimits:
          memlock:
            soft: -1
            hard: -1
        volumes:
          - data03:/usr/share/elasticsearch/data
        networks:
          - elastic
    volumes:
      data01:
        driver: local
      data02:
        driver: local
      data03:
        driver: local
    networks:
      elastic:
        driver: bridge
        
Kurulumları gerçekleştirdikten sonra kullanabilir.
​
​
### BAYES ALGORİTMASI
​
Middlaware uygulama katmanında, NaiveBayes algoritması kullanılarak elastic search üzerinden dönecek olan verinin karşılaştırılması yapılmıştır. Uygulama Java tabanlı ve default 6161 portunda çalışmakta. Algoritma için https://github.com/datumbox/datumbox-framework adresinde bulunan kaynak kodlardan yararlanıldı.
Ekonomi, Politika, Sanat, Spor ve Teknoloji alanlarında sınıflandırma yapılabiliyor. 2 api üzerinden işlemler gerçekleştiriliyor;  

api urls: /api/addContent , /api/classify  

1-addContent: bu API üzerinden, eğitilmiş durumda bulunan datasete yeni bir sınıflandırma eklenebiliyor veya varol sınıflandırmaya yeni bir input eklenerek sistem yeniden eğitilebiliyor.
    
    {
        "content": "yeni_content2",
        "body": "bugün Türkiye genelinde hava yapışlı ve soğuk geçecek. Kıyı kesimlerinde zaman zaman şiddetli rüzgarlar görüleblir."
    }
    
2-classify: bu API üzerinden gönderilen metnin hangi kategoriye ait olduğu hesaplanmakta.
    
    {
        "body": "bugün Türkiye genelinde hava yapışlı ve soğuk geçecek. Kıyı kesimlerinde zaman zaman şiddetli rüzgarlar görüleblir."
    }
​
