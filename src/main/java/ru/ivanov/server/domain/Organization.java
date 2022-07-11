package ru.ivanov.server.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "ORGANIZATION")
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class Organization {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private Integer id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "FORM")
    private String form;

    @Column(name = "CAPITAL")
    private BigDecimal capital;

//
//    @Column(name = "REG_DATE")
//    private Date reg_date;
}
