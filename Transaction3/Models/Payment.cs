using System;
using System.Collections.Generic;

namespace Transaction3.Models;

public partial class Payment
{
    public int Id { get; set; }

    public int Amount { get; set; }

    public string? Cardno { get; set; }

    public string? Nameoncard { get; set; }

    public DateTime? Paymentdate { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
