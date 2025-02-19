using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace Transaction3.Models;

public partial class Mfts3Context : DbContext
{
    public Mfts3Context()
    {
    }

    public Mfts3Context(DbContextOptions<Mfts3Context> options)
        : base(options)
    {
    }

    public virtual DbSet<Address> Addresses { get; set; }

    public virtual DbSet<Admin> Admins { get; set; }

    public virtual DbSet<Customer> Customers { get; set; }

    public virtual DbSet<Event> Events { get; set; }

    public virtual DbSet<Guide> Guides { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<Orderdetail> Orderdetails { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=root;database=mfts3", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.2.0-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Address>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("address");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.City)
                .HasMaxLength(255)
                .HasColumnName("city");
            entity.Property(e => e.Country)
                .HasMaxLength(255)
                .HasColumnName("country");
            entity.Property(e => e.State)
                .HasMaxLength(255)
                .HasColumnName("state");
            entity.Property(e => e.Zip)
                .HasMaxLength(255)
                .HasColumnName("zip");
        });

        modelBuilder.Entity<Admin>(entity =>
        {
            entity.HasKey(e => e.Userid).HasName("PRIMARY");

            entity.ToTable("admin");

            entity.Property(e => e.Userid).HasColumnName("userid");
            entity.Property(e => e.Pwd)
                .HasMaxLength(255)
                .HasColumnName("pwd");
            entity.Property(e => e.Uname)
                .HasMaxLength(255)
                .HasColumnName("uname");
        });

        modelBuilder.Entity<Customer>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("customer");

            entity.HasIndex(e => e.Email, "UK3qgg01qojcmbdp47dkaom9x45").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.City)
                .HasMaxLength(255)
                .HasColumnName("city");
            entity.Property(e => e.CreatedTimestamp)
                .HasMaxLength(6)
                .HasColumnName("created_timestamp");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.Gender)
                .HasMaxLength(255)
                .HasColumnName("gender");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Phone)
                .HasMaxLength(255)
                .HasColumnName("phone");
            entity.Property(e => e.Pwd)
                .HasMaxLength(255)
                .HasColumnName("pwd");
        });

        modelBuilder.Entity<Event>(entity =>
        {
            entity.HasKey(e => e.Eventid).HasName("PRIMARY");

            entity.ToTable("event");

            entity.HasIndex(e => e.Guided, "FKonlbv32v9u1bt0m8owu2xveit");

            entity.Property(e => e.Eventid).HasColumnName("eventid");
            entity.Property(e => e.CreatedTimestamp)
                .HasMaxLength(6)
                .HasColumnName("created_timestamp");
            entity.Property(e => e.Dailywiseschedule)
                .HasMaxLength(4000)
                .HasColumnName("dailywiseschedule");
            entity.Property(e => e.Date)
                .HasMaxLength(6)
                .HasColumnName("date");
            entity.Property(e => e.Description)
                .HasMaxLength(4000)
                .HasColumnName("description");
            entity.Property(e => e.Eventcat)
                .HasMaxLength(255)
                .HasColumnName("eventcat");
            entity.Property(e => e.Eventname)
                .HasMaxLength(255)
                .HasColumnName("eventname");
            entity.Property(e => e.Guided).HasColumnName("guided");
            entity.Property(e => e.Location)
                .HasMaxLength(255)
                .HasColumnName("location");
            entity.Property(e => e.Noofdays)
                .HasMaxLength(255)
                .HasColumnName("noofdays");
            entity.Property(e => e.Photo1)
                .HasMaxLength(255)
                .HasColumnName("photo1");
            entity.Property(e => e.Photo2)
                .HasMaxLength(255)
                .HasColumnName("photo2");
            entity.Property(e => e.Photo3)
                .HasMaxLength(255)
                .HasColumnName("photo3");
            entity.Property(e => e.Pickupanddroplocation)
                .HasMaxLength(255)
                .HasColumnName("pickupanddroplocation");
            entity.Property(e => e.Price).HasColumnName("price");
            entity.Property(e => e.Thingstocarry)
                .HasMaxLength(4000)
                .HasColumnName("thingstocarry");

            entity.HasOne(d => d.GuidedNavigation).WithMany(p => p.Events)
                .HasForeignKey(d => d.Guided)
                .HasConstraintName("FKonlbv32v9u1bt0m8owu2xveit");
        });

        modelBuilder.Entity<Guide>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("guide");

            entity.HasIndex(e => e.Email, "UKowlxh59f95tpopn0k0x42939r").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.City)
                .HasMaxLength(255)
                .HasColumnName("city");
            entity.Property(e => e.CreatedTimestamp)
                .HasMaxLength(6)
                .HasColumnName("created_timestamp");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.Name)
                .HasMaxLength(255)
                .HasColumnName("name");
            entity.Property(e => e.Phone)
                .HasMaxLength(255)
                .HasColumnName("phone");
            entity.Property(e => e.Pwd)
                .HasMaxLength(255)
                .HasColumnName("pwd");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.HasKey(e => e.Orderid).HasName("PRIMARY");

            entity.ToTable("orders");

            entity.HasIndex(e => e.PaymentId, "FK3uouvmvg4j5yov27idsmpw468");

            entity.HasIndex(e => e.CustomerId, "FKeokvurs5fbw7s13q8nmgpqx71");

            entity.HasIndex(e => e.AddressId, "FKh9mg44fdpi0pwusk56r0xged5");

            entity.Property(e => e.Orderid).HasColumnName("orderid");
            entity.Property(e => e.AddressId).HasColumnName("addressId");
            entity.Property(e => e.CustomerId).HasColumnName("customerId");
            entity.Property(e => e.OrderDate)
                .HasMaxLength(6)
                .HasColumnName("orderDate");
            entity.Property(e => e.PaymentId).HasColumnName("paymentId");

            entity.HasOne(d => d.Address).WithMany(p => p.Orders)
                .HasForeignKey(d => d.AddressId)
                .HasConstraintName("FKh9mg44fdpi0pwusk56r0xged5");

            entity.HasOne(d => d.Customer).WithMany(p => p.Orders)
                .HasForeignKey(d => d.CustomerId)
                .HasConstraintName("FKeokvurs5fbw7s13q8nmgpqx71");

            entity.HasOne(d => d.Payment).WithMany(p => p.Orders)
                .HasForeignKey(d => d.PaymentId)
                .HasConstraintName("FK3uouvmvg4j5yov27idsmpw468");
        });

        modelBuilder.Entity<Orderdetail>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("orderdetails");

            entity.HasIndex(e => e.OrderId, "FK4p5c64mj3tsqj1v4ypeq3jans");

            entity.HasIndex(e => e.EventId, "FKlmsdoreny818b39udyc8l19im");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.EventId).HasColumnName("eventId");
            entity.Property(e => e.OrderId).HasColumnName("orderId");
            entity.Property(e => e.Qty).HasColumnName("qty");

            entity.HasOne(d => d.Event).WithMany(p => p.Orderdetails)
                .HasForeignKey(d => d.EventId)
                .HasConstraintName("FKlmsdoreny818b39udyc8l19im");

            entity.HasOne(d => d.Order).WithMany(p => p.Orderdetails)
                .HasForeignKey(d => d.OrderId)
                .HasConstraintName("FK4p5c64mj3tsqj1v4ypeq3jans");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("payments");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Amount).HasColumnName("amount");
            entity.Property(e => e.Cardno)
                .HasMaxLength(255)
                .HasColumnName("cardno");
            entity.Property(e => e.Nameoncard)
                .HasMaxLength(255)
                .HasColumnName("nameoncard");
            entity.Property(e => e.Paymentdate)
                .HasMaxLength(6)
                .HasColumnName("paymentdate");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
