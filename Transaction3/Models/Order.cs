using System;
using System.Collections.Generic;

namespace Transaction3.Models;

public partial class Order
{
    public int Orderid { get; set; }

    public DateTime? OrderDate { get; set; }

    public int? AddressId { get; set; }

    public int? CustomerId { get; set; }

    public int? PaymentId { get; set; }

    public virtual Address? Address { get; set; }

    public virtual Customer? Customer { get; set; }

    public virtual ICollection<Orderdetail> Orderdetails { get; set; } = new List<Orderdetail>();

    public virtual Payment? Payment { get; set; }
}
