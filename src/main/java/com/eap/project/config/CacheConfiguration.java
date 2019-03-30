package com.eap.project.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.eap.project.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.eap.project.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.eap.project.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.eap.project.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.eap.project.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.eap.project.domain.PersistentToken.class.getName(), jcacheConfiguration);
            cm.createCache(com.eap.project.domain.User.class.getName() + ".persistentTokens", jcacheConfiguration);
            cm.createCache(com.eap.project.domain.Company.class.getName(), jcacheConfiguration);
            cm.createCache(com.eap.project.domain.Company.class.getName() + ".departments", jcacheConfiguration);
            cm.createCache(com.eap.project.domain.Company.class.getName() + ".employees", jcacheConfiguration);
            cm.createCache(com.eap.project.domain.Company.class.getName() + ".jobs", jcacheConfiguration);
            cm.createCache(com.eap.project.domain.Department.class.getName(), jcacheConfiguration);
            cm.createCache(com.eap.project.domain.Department.class.getName() + ".employees", jcacheConfiguration);
            cm.createCache(com.eap.project.domain.Department.class.getName() + ".jobs", jcacheConfiguration);
            cm.createCache(com.eap.project.domain.Employee.class.getName(), jcacheConfiguration);
            cm.createCache(com.eap.project.domain.Employee.class.getName() + ".employees", jcacheConfiguration);
            cm.createCache(com.eap.project.domain.Job.class.getName(), jcacheConfiguration);
            cm.createCache(com.eap.project.domain.Holiday.class.getName(), jcacheConfiguration);
            cm.createCache(com.eap.project.domain.RestLeaveHoliday.class.getName(), jcacheConfiguration);
            cm.createCache(com.eap.project.domain.SickLeaveHoliday.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
