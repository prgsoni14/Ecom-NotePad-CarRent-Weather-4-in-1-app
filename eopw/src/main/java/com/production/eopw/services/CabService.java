package com.production.eopw.services;

import java.util.List;

import com.production.eopw.models.Cab;

public interface CabService {

        public Cab createCab(Cab cab,String username);
        public List<Cab> getCabs(String username);
        public Cab deleteCab(Long id, String username);

        public List<Cab> cabRequests();
        public Cab updateCab(Long id, String username);
        public List<Cab> cabApprovalsByAdmin(String username);
}
