using System;
using System.Collections.Generic;

namespace Transaction3.Models;

public partial class Customer
{
    public int Id { get; set; }

    public string? City { get; set; }

    public DateTime? CreatedTimestamp { get; set; }

    public string? Gender { get; set; }

    public string? Name { get; set; }

    public string? Phone { get; set; }

    public string? Pwd { get; set; }

    public string? Email { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
