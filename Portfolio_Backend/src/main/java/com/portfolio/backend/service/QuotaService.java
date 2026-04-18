package com.portfolio.backend.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class QuotaService {
    // ip -> count
    private final Map<String, AtomicInteger> ipQuotaMap = new ConcurrentHashMap<>();
    private static final int MAX_MESSAGES_PER_DAY = 3;

    public boolean isAllowed(String ipAddress) {
        AtomicInteger count = ipQuotaMap.computeIfAbsent(ipAddress, k -> new AtomicInteger(0));
        return count.get() < MAX_MESSAGES_PER_DAY;
    }

    public void increment(String ipAddress) {
        ipQuotaMap.computeIfAbsent(ipAddress, k -> new AtomicInteger(0)).incrementAndGet();
    }

    // Reset every midnight
    @Scheduled(cron = "0 0 0 * * *")
    public void resetQuotas() {
        ipQuotaMap.clear();
    }
}
