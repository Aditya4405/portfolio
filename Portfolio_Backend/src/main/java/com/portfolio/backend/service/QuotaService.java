package com.portfolio.backend.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class QuotaService {
    // email -> count
    private final Map<String, AtomicInteger> quotaMap = new ConcurrentHashMap<>();
    private static final int MAX_MESSAGES_PER_DAY = 3;

    public boolean isAllowed(String email) {
        AtomicInteger count = quotaMap.computeIfAbsent(email, k -> new AtomicInteger(0));
        return count.get() < MAX_MESSAGES_PER_DAY;
    }

    public void increment(String email) {
        quotaMap.computeIfAbsent(email, k -> new AtomicInteger(0)).incrementAndGet();
    }

    // Reset every midnight
    @Scheduled(cron = "0 0 0 * * *")
    public void resetQuotas() {
        quotaMap.clear();
    }
}
