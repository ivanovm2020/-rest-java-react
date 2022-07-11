package ru.ivanov.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.format.annotation.NumberFormat;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import ru.ivanov.server.domain.Organization;
import ru.ivanov.server.service.ORMOrganizationService;

import java.math.BigDecimal;
import java.util.List;

@RepositoryRestController
@Controller
public class RestOrganizationController {

    private final ORMOrganizationService ormOrganizationService;

    @Autowired
    public RestOrganizationController(ORMOrganizationService ormOrganizationService) {
        this.ormOrganizationService = ormOrganizationService;
    }

    @RequestMapping(
            value = "/api/organization",
            method = RequestMethod.GET)
    @ResponseBody
    public List<Organization> ormFindAllOrganizations() {
        return ormOrganizationService.queryFindAllOrganizationsJPA();
    }

    @RequestMapping(
            value = "/api/organization",
            method = RequestMethod.PUT)
    @ResponseBody
    public List<Organization> ormInsertOrganizationById(
            @RequestParam(value = "name") String name,
            @RequestParam(value = "form") String form,
            @RequestParam(value = "capital", required=false) @NumberFormat(pattern="#0,00") BigDecimal capital
    ) {
        return ormOrganizationService.insertOrganization(name, form, capital);
    }

    @RequestMapping(
            value = "/api/organization",
            method = RequestMethod.DELETE)
    @ResponseBody
    public List<Organization>  ormDeleteOrganizationById(@RequestParam(value = "id") Integer id) {
        return ormOrganizationService.deleteOrganizationById(id);
    }

}
