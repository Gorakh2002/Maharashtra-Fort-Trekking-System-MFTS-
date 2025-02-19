using System;
using System.Collections.Generic;

namespace Transaction3.Models;

public partial class Address
{
    public int Id { get; set; }

    public string? City { get; set; }

    public string? Country { get; set; }

    public string? State { get; set; }

    public string? Zip { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
