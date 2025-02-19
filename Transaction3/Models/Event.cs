using System;
using System.Collections.Generic;

namespace Transaction3.Models;

public partial class Event
{
    public int Eventid { get; set; }

    public DateTime? CreatedTimestamp { get; set; }

    public string? Dailywiseschedule { get; set; }

    public DateTime? Date { get; set; }

    public string? Description { get; set; }

    public string? Eventcat { get; set; }

    public string? Eventname { get; set; }

    public string? Location { get; set; }

    public string? Noofdays { get; set; }

    public string? Photo1 { get; set; }

    public string? Photo2 { get; set; }

    public string? Photo3 { get; set; }

    public string? Pickupanddroplocation { get; set; }

    public int Price { get; set; }

    public string? Thingstocarry { get; set; }

    public int? Guided { get; set; }

    public virtual Guide? GuidedNavigation { get; set; }

    public virtual ICollection<Orderdetail> Orderdetails { get; set; } = new List<Orderdetail>();
}
