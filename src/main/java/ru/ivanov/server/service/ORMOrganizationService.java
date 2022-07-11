package ru.ivanov.server.service;

import org.springframework.stereotype.Repository;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.math.BigDecimal;
import java.util.List;
import org.springframework.transaction.annotation.Transactional;

import ru.ivanov.server.domain.Organization;

@Repository
@Transactional
public class ORMOrganizationService {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Organization> queryFindAllOrganizationsJPA() {
        String query = "from Organization order by id";
        TypedQuery<Organization> typedQuery = entityManager.createQuery(query, Organization.class);
        return typedQuery.getResultList();
    }

    public List<Organization> insertOrganization(String name, String form, BigDecimal capital) {
        String qlString = "insert into Organization (name, form, capital) values (?, ?, ?)";
        entityManager.createNativeQuery(qlString)
                .setParameter(1, name)
                .setParameter(2, form)
                .setParameter(3, capital)
                .executeUpdate();
        return queryFindAllOrganizationsJPA();
    }

    public List<Organization> deleteOrganizationById(Integer id) {
        String query = "delete from Organization u where u.id=:id";
        entityManager.createQuery(query)
                .setParameter("id", id)
                .executeUpdate();
        return queryFindAllOrganizationsJPA();
    }

}
